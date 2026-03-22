import QRCode from "qrcode"
import { useState } from "react"

const CustomerRegistrationForm = () => {

  const [customer, setCustomer] = useState("") 
  const  [src, setSrc] = useState<string>('')

  const handleSubmit = (e: any) => {
    e.preventDefault();
    QRCode.toDataURL(`https://github.com/${customer}`).then(setSrc)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col max-w-full max-h-full items-center justify-center'>
        <legend className='text-3xl font-bold m-10 p-5'>Customer Registration</legend>

        <img src={src} />

        <label className='text-xl font-bold m-2 p-5'>Customer Name</label>
        <input className='border-2 rounded-xl h-10 p-3' type='text' name='c_name' onChange={(e) => setCustomer(e.target.value)} value={customer}/>

        <label className='text-xl font-bold m-2 p-5'>Phone Number</label>
        <input className='border-2 rounded-xl h-10 p-3' type='text' name='phone_number' />

        <label className='text-xl font-bold m-2 p-5'>Vehicle Model</label>
        <input className='border-2 rounded-xl h-10 p-3' type='text' name='vehicle_model' />

        <button className='border-3 m-2 px-6 cursor-pointer rounded-2xl' type='submit'>
            Submit
        </button>
      </form>
    </div>
  )
}

export default CustomerRegistrationForm
