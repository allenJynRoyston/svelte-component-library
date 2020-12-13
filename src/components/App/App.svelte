<script>
  import {Form} from '../index'

  let formData = [
    {
      renderAs: 'input',      
      label: 'Username',
      placeholder: 'example: john smith',
      key: 'username',
      value: '', 
      regex: /^[a-zA-Z]+$/,      
      minLength: 3,
      maxLength: 10,
      required: true
    },
    {
      renderAs: 'input', 
      type: 'password', 
      label: 'Password',
      key: 'password',
      value: 'notapassword',
      required: true
    },
    {
      renderAs: 'textarea', 
      type: 'description', 
      label: 'Description',
      key: 'description',
      value: 'blah blah blah blah',
      required: true,
      minLength: 5
    },
    {
      renderAs: 'date', 
      label: 'Date',
      key: 'date',
      value: '12-01-1982',
      minDate: '01-01-1950',
      maxDate: '01-01-2020',      
      required: true
    },  
    {
      renderAs: 'time', 
      label: 'Time',
      key: 'time',
      value: '09:00',
      minTime: '07:00',
      maxTime: '22:00',      
      required: true
    },     
    {
      renderAs: 'checkbox', 
      label: 'Agree',
      key: 'agree',
      text: 'Do you agree to the terms and agreements?',
      value: true,
      required: true
    },                   
  ]

  const onSubmit = (e) => {
    console.log(e)
  }

</script>

<style lang='scss' scoped>

</style>

<Form {formData} {onSubmit} />

