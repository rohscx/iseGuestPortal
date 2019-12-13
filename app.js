const prompts = require('prompts');
const iseEndpoints = require('./lib/iseInteractions/iseEndPoints.js');
const iseConnectionTest = require('./lib/iseInteractions/iseConnectionTest.js');
const deleteIseEndpoints = require('./lib/iseInteractions/deleteIseEndpoints.js');
const updateInterUserPassword = require('./lib/iseInteractions/updateInterUserPassword');
const dotenv = require('dotenv').config();

const iseAuth = process.env.ISE_AUTH;
const iseServer = process.env.ISE_SERVER;
const guestEpigs = JSON.parse(process.env.ISE_GUEST_EPIG_IDS);


const createChocies = (data) =>{
  return data.reduce((n, o, i) => {
   const {name, epigId, iuId, iuName, iuPassword} = o;
   const firstIndex = i === 0;
   const lastIndex = i === data.length;
   if (firstIndex) {
    n.push(({title: `Test:: ISE_Connection`, description: `Test Connectivity`, value: {switchSelect: 'iseTest'}}));
   } 
   n.push(({title: `View:: ${name} Guest_WiFi_EndPoints`, description: `Count then number of EndPoints in a group`, value: {switchSelect: 'guestEndpoints', epigId}}));
   n.push(({title: `Count:: ${name} Guest_WiFi_EndPoints`, description: `Retrieved the EndPoints in a group`, value: {switchSelect: 'countGuestEndpoints', epigId}}));
   n.push(({title: `Update:: ${name} Guest_WiFi_Password`, description: `UPDATE Guest WiFi Password`, value: {switchSelect: 'updateGuestpassword', epigId, iuId, iuPassword, iuName}}));
   n.push(({title: `Delete: ${name} Guest_WiFi_EndPoints`, description: `DELETE EndPoints in a group`, value: {switchSelect: 'deleteGuestEndpoints', epigId}}));
   n.push(({title: `Delete&Update:: ${name} Guest WiFi EndPoints & Password`, description: `DELETE EndPoints in a group & UPDATE Guest WiFi Password`, value: {switchSelect: 'deleteGuestEndpoints&updateGuestpassword', epigId,iuId, iuPassword}}));
   if (lastIndex) {
     const allEpigId = data.map((d) => d.epigId);
     const allIuId = data.map((d) => d.iuId);
    n.push(({title: `Delete&Update_All:: ALL_Guest_WiFi_EndPoints_&_Passwords`, description: `DELETE EndPoints in a group & UPDATE Guest WiFi Password`, value: {switchSelect: 'deleteGuestEndpoints&updateGuestpasswordAll', epigId:allEpigId,iuId:allIuId, iuPassword}}));
    n.push(({title: `Exit`, description: `Do nothing and exit`, value: {}}));
  } 
   return n;

  }, []);
}
const questions = [
    {
        type: 'select',
        name: 'value',
        message: 'Select an action',
        choices: createChocies(guestEpigs),
        initial: 1
      },
  ];

const confirm = [
  {
    type: 'confirm',
    name: 'value',
    message: 'Are you sure that you wish to proceed with this action?'.toUpperCase(),
    initial: false
  }
];
   
(  async function  () {
    const response = await prompts(questions);
    // if user force quits the app return default
    const {switchSelect, epigId, iuPassword = null, iuId = null, iuName = null} = response.value || {switchSelect:null,epigId:null};
    switch (switchSelect) {
        case "iseTest":
            iseConnectionTest(iseServer,iseAuth,epigId).then((t) => console.log(`Test Succcess \n  Servers Found: \n${t.SearchResult.resources.map(({name}) => "\t"+name).join('\n')}`)).catch(console.log)
            break;
        case "guestEndpoints":
            iseEndpoints(iseServer,iseAuth,epigId).then((t) => console.log(t.map(({id, name}) => name))).catch(console.log)
            break;
        case "countGuestEndpoints":
            iseEndpoints(iseServer,iseAuth,epigId).then((t) => console.log(`\n\n\nThere are ${t.length} EndPoints\n\n\n`)).catch(console.log)
            break;
        case "updateGuestpassword":
            const updateConfirmation = await prompts(confirm);
            if (updateConfirmation.value == true) {
              updateInterUserPassword(iseServer,iseAuth,iuId,iuName,iuPassword).then((t) => console.log(JSON.stringify(t, null, '\t'))).catch((t) => console.log("reject \n" + JSON.stringify(t, null, '\t')))
            } else {
              console.log('Update Canceled')
            }       
            break;
        case "deleteGuestEndpoints":
            const deleteConfirmation = await prompts(confirm);
            if (deleteConfirmation.value == true) {
              deleteIseEndpoints(iseServer,iseAuth,epigId).then(console.log).catch(console.log)
            } else {
              console.log('Delete Canceled')
            }     
            break;

        default:
            console.log('Thanks for using the App have a great day!!')
            break;
    }
    // => response => { username, age, about }
    // console.log(response)
  })()