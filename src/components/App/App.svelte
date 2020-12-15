<script>
  import {Form} from '../index'

  let formData = [
    {
      renderAs: 'input',      
      label: 'Username',
      placeholder: 'example: john smith',
      key: 'username',
      value: 'allen.royston', 
      regex: /^[a-zA-Z.]+$/,      
      minLength: 3,
      maxLength: 25,
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
    {
      renderAs: 'select', 
      label: 'Select',
      key: 'select',      
      value: null,
      defaultOption: 'Select an option',
      options: [
        {id: 1, title: 'option 1'},
        {id: 2, title: 'option 2'},
        {id: 3, title: 'option 3'},
        {id: 4, title: 'option 4'}
      ],
      onInitFilter: (val, options) => {        
        return options.find(x => x.id === val)
      },
      onChangeFilter: (val) => {
        return val && val.title
      },
      required: true
    }, 
    {
      renderAs: 'selectmulti', 
      label: 'Select',
      key: 'select',      
      value: [1, 3],      
      options: [
        {id: 1, title: 'option 1'},
        {id: 2, title: 'option 2'},
        {id: 3, title: 'option 3'},
        {id: 4, title: 'option 4'}
      ],
      onInitFilter: (arr, options) => {  
        return options.map((x) => {
          arr.forEach(v => {
            x._selected = !x._selected ? (x.id === v) : x._selected
          })
          return x
        })
      },
      onChangeFilter: (arr) => {           
        return arr.map(x => {
          delete x.id
          return x
        })
      },
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

