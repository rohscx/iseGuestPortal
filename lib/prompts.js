const prompts = require('prompts');
 
const questions = [
    {
        type: 'select',
        name: 'value',
        message: 'Select an action',
        choices: [
          { title: 'View FCE Guest EndPoints', description: 'Retrieved EndPoints', value: '#ff0000' },
          { title: 'Green', value: '#00ff00', disabled: true },
          { title: 'Blue', value: '#0000ff' }
        ],
        initial: 1
      },
    {
      type: 'text',
      name: 'username',
      message: 'What is your GitHub username?'
    },
    {
      type: 'number',
      name: 'age',
      message: 'How old are you?'
    },
    {
      type: 'text',
      name: 'about',
      message: 'Tell something about yourself',
      initial: 'Why should I?'
    }
  ];
   
module.exports = async function  () {
    const response = await prompts(questions);
   
    // => response => { username, age, about }
    console.log(response)
  }