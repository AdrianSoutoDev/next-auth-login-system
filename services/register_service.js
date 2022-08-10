export async function register(form){
    const JSONdata = JSON.stringify(form)
    const endpoint = '/api/register'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    return await fetch(endpoint, options)
}