const prompts = require('prompts');
const iseEndpoints = require('./lib/iseInteractions/iseEndPoints.js');
const deleteIseEndpoints = require('./lib/iseInteractions/deleteIseEndpoints.js');
const dotenv = require('dotenv').config();

const iseAuth = process.env.ISE_AUTH;
const iseServer = process.env.ISE_SERVER;
const guestEpigs = JSON.parse(process.env.ISE_GUEST_EPIG_IDS);


const createChocies = (data) =>{
  return data.reduce((n, o) => {
   const {name, epigId} = o;
    n.push(({title: `View ${name} Guest EndPoints`, description: `Count then number of EndPoints in a group`, value: {switchSelect: 'guestEndpoints', epigId}}));
    n.push(({title: `Count ${name} Guest EndPoints`, description: `Retrieved the EndPoints in a group`, value: {switchSelect: 'countGuestEndpoints', epigId}}));
    n.push(({title: `Delete All ${name} Guest EndPoints`, description: `DELETE then number of EndPoints in a group`, value: {switchSelect: 'deleteGuestEndpoints', epigId}}));
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
    message: 'Can you confirm your request?',
    initial: false
  }
];
   
(  async function  () {
    const response = await prompts(questions);
    const {switchSelect, epigId } = response.value;
    switch (switchSelect) {
        case "guestEndpoints":
            iseEndpoints(iseServer,iseAuth,epigId).then((t) => console.log(t.map(({id, name}) => name)))
            break;
        case "countGuestEndpoints":
            iseEndpoints(iseServer,iseAuth,epigId).then((t) => console.log(`\n\n\nThere are ${t.length} EndPoints\n\n\n`))
            break;
        case "deleteGuestEndpoints":
            const deleteConfirmation = await prompts(confirm);
            if (deleteConfirmation.value == true) {
              deleteIseEndpoints(iseServer,iseAuth,epigId).then(console.log)
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