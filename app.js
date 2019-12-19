const prompts = require('prompts');
const caseIseTest = require('./lib/promps/caseIseTest.js');
const caseGuestEndpoints = require('./lib/promps/caseGuestEndpoints.js');
const caseGuestEndpointsAll = require('./lib/promps/caseGuestEndpointsAll.js');
const caseCountGuestEndpoints = require('./lib/promps/caseCountGuestEndpoints.js');
const caseUpdateInterUserPassword = require('./lib/promps/caseUpdateInterUserPassword.js');
const caseDeleteGuestEndpoints = require('./lib/promps/caseDeleteGuestEndpoints.js');
const caseCountGuestEndpointsAll = require('./lib/promps/caseCountGuestEndpointsAll.js');
const caseDeleteUpdateGuestEndpointsAll = require('./lib/promps/caseDeleteUpdateGuestEndpointsAll.js');
const caseDeleteGuestEndpointsAll = require('./lib/promps/caseDeleteGuestEndpointsAll.js');

const dotenv = require('dotenv').config();

const iseAuth = process.env.ISE_AUTH;
const iseServer = process.env.ISE_SERVER;
const guestEpigs = require('./iseGuestConfig.json');


const createChocies = (data) =>{
  return data.reduce((n, o, i) => {
   const {name, epigId, iuId, iuName, iuPassword} = o;
   const firstIndex = i === 0;
   const lastIndex = i+1 === data.length;
   if (firstIndex) {
    n.push(({title: `Test:: ISE_Connection`, description: `Test Connectivity`, value: {switchSelect: 'iseTest'}}));
   } 
   n.push(({title: `View:: ${name} Guest_WiFi_EndPoints`, description: `Count then number of EndPoints in a group`, value: {switchSelect: 'guestEndpoints', epigId}}));
   n.push(({title: `Count:: ${name} Guest_WiFi_EndPoints`, description: `GET the EndPoints in a group`, value: {switchSelect: 'countGuestEndpoints', epigId}}));
   n.push(({title: `Update:: ${name} Guest_WiFi_Password`, description: `UPDATE Guest WiFi Password`, value: {switchSelect: 'updateGuestpassword', epigId, iuId, iuPassword, iuName}}));
   n.push(({title: `Delete: ${name} Guest_WiFi_EndPoints`, description: `DELETE EndPoints in a group`, value: {switchSelect: 'deleteGuestEndpoints', epigId}}));
   n.push(({title: `Delete_&_Update:: ${name} Guest WiFi EndPoints & Password`, description: `DELETE EndPoints in a group & UPDATE Guest WiFi Password`, value: {switchSelect: 'deleteGuestEndpoints&updateGuestpassword', epigId, iuId, iuPassword, iuName}}));
   if (lastIndex) { 
    const allEpigId = data.map((d) => d.epigId);
    const allAuth = data.map(({iuId,iuName,iuPassword, epigId}) => ({iuId,iuName,iuPassword,epigId}));
    n.push(({title: `View_All:: ALL_Guest_WiFi_EndPoints`, description: `GET EndPoints in a groups`, value: {switchSelect: 'guestEndpointsAll', epigId:allEpigId}}));
    n.push(({title: `Count_All:: ALL_Guest_WiFi_EndPoints`, description: `GET EndPoints in a groups`, value: {switchSelect: 'countGuestEndpointsAll', epigId:allEpigId}}));
    n.push(({title: `Delete_All:: ALL_Guest_WiFi_EndPoints`, description: `DELETE EndPoints in a group`, value: {switchSelect: 'deleteGuestEndpointsAll', epigId:data}}));
    n.push(({title: `Delete_&_Update_All:: ALL_Guest_WiFi_EndPoints_&_Passwords`, description: `DELETE EndPoints in a group & UPDATE Guest WiFi Password`, value: {switchSelect: 'deleteGuestEndpoints&updateGuestpasswordAll', epigId:data}}));
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
   
(  async function promptFunction  () {
  const onCancel = prompt => {
    console.log('Never stop prompting!');
    return true;
  }
    const response = await prompts(questions, {onCancel});
    // if user force quits the app return default
    const {switchSelect, epigId, iuPassword = null, iuId = null, iuName = null} = response.value || {switchSelect:null,epigId:null};
    switch (switchSelect) {
        case "iseTest":
            caseIseTest(iseServer,iseAuth,epigId,promptFunction)
            break;
        case "guestEndpoints":
            caseGuestEndpoints(iseServer,iseAuth,epigId,promptFunction)
            break;
        case "guestEndpointsAll":
            caseGuestEndpointsAll(iseServer,iseAuth,epigId,promptFunction) 
            break;
        case "countGuestEndpoints":
            caseCountGuestEndpoints(iseServer,iseAuth,epigId,promptFunction)
            break;
        case "countGuestEndpointsAll":
            caseCountGuestEndpointsAll(iseServer,iseAuth,epigId,promptFunction)
            break;
        case "updateGuestpassword":
            const updateConfirmation = await prompts(confirm);
            if (updateConfirmation.value == true) {
              caseUpdateInterUserPassword(iseServer,iseAuth,iuId,iuName,iuPassword,promptFunction)
            } else {
              console.log('Update Canceled')
            }       
            break;
        case "deleteGuestEndpoints":
            const deleteConfirmation = await prompts(confirm);
            if (deleteConfirmation.value == true) {
              caseDeleteGuestEndpoints(iseServer,iseAuth,epigId,promptFunction)
            } else {
              console.log('Delete Canceled')
            }     
            break;
        case "deleteGuestEndpoints&updateGuestpassword":
            const deleteUpdateConfirmation = await prompts(confirm);
            if (deleteUpdateConfirmation.value == true) {
              caseDeleteGuestEndpoints(iseServer,iseAuth,epigId,promptFunction)
              caseUpdateInterUserPassword(iseServer,iseAuth,iuId,iuName,iuPassword,promptFunction)
            } else {
              console.log('Delete Canceled')
            }     
            break;
      case "deleteGuestEndpointsAll":
          const deleteConfirmationAll = await prompts(confirm);
          if (deleteConfirmationAll.value == true) {
            caseDeleteGuestEndpointsAll(iseServer,iseAuth,epigId,promptFunction)
          } else {
            console.log('Delete Canceled')
          }     
          break;
      case "deleteGuestEndpoints&updateGuestpasswordAll":
          const deleteUpdateConfirmationAll = await prompts(confirm);
          if (deleteUpdateConfirmationAll.value == true) {
            caseDeleteUpdateGuestEndpointsAll(iseServer,iseAuth,epigId,promptFunction)
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