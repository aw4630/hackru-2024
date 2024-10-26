"use client"
import Client from '@/components/client';
import {fetchAccessToken} from 'hume';

export default function Voice(){
    const accessToken = fetchAccessToken({
        apiKey: String(process.env.HUME_API_KEY),
        secretKey: String(process.env.HUME_SECRET_KEY),
      });
    return (
        <div className='flex justify-center h-screen'>
       
            <div className='flex flex-col h-screen justify-between p-16'>
                <h3 className='text-center text-2xl'>Personal Friend</h3>
                <Client accessToken={accessToken.toString()}/>
            </div>
            
        </div>
        
    )
}
