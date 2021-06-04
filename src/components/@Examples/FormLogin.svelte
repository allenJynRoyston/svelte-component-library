<script>
  import Form from '@form/FormBuilder.svelte'

  export let onSubmit = (e) => {
    isBusy = true
    setTimeout(() => {
      alert('submitted')
      isBusy = false
    }, 2000)
  };

  export let localStorageKey = null;
  export let idModifier = null;
  export let clearLocalStorage = true;

  let isBusy = false


  let formData = [
    {
      renderAs: 'input',      
      label: 'Email',
      placeholder: 'user@email.com',
      key: 'email',
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
      allowShowToggle: true,
      required: true
    }                                 
  ]


  const props = {
    formData,
    onSubmit, 
    idModifier,
    padding: 20,
    localStorageKey,
    clearLocalStorage    
  }


</script>


<Form {...props} {isBusy}>
  {isBusy ? 'Submitting...' : 'Submit'}
</Form>

