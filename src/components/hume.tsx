"use client"
import React, {useState, useEffect} from "react";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import {Mic, MicOff, Send} from 'lucide-react';

export default function Hume(){
    const {connect, disconnect, readyState, messages} = useVoice();
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([{
        text:"Hi! How are you doing today?", sender: 'bot'
    }]);
    const [requestingPermission, setRequestingPermission] = useState(false);
    React.useEffect(()=>{
        if(messages.length>0){
            const last = messages[messages.length-1];
            if(last.type==='user_message'||last.type==='assistant_message'){
                const content = last.message.content;
                if(content) setChatHistory(prev => [...prev, {text:content, sender:last.type==='user_message'?'user':'bot'}]);
            }
        }
    }, [messages]);
    useEffect(()=>{checkPermissions();},[]);
    async function checkPermissions(){
        if(typeof navigator.permissions !== 'undefined'){
            try{
                const status = await navigator.permissions.query({ name: 'microphone' as PermissionName});
                return status.state === 'granted';
            }
            catch(err) {console.error('Failed to check audio permissions: ', err);}
        }
        return false;
    }
    async function requestPermission(){
        setRequestingPermission(true);
        try{
            const stream = await navigator.mediaDevices.getUserMedia({audio:true});
            stream.getTracks().forEach(track=>track.stop());
            return true;
        }
        catch(err){
            console.error("Failed to request audio permissions: ", err);
            return false;
        }
        finally{
            setRequestingPermission(false);
        }
    }
    async function handleConnect(){
        const hasPermission = await checkPermissions();
        if(!hasPermission){
            const granted = await requestPermission();
            if(!granted){
                setChatHistory(prev=>[...prev,{text:'Please grant audio permissions.', sender:'system'}]);
                return;
            }
        }
        connect().then(()=>{
            setChatHistory(prev=>[...prev, {text:'Session started', sender:'system'}]);
        }).catch(()=>{
            setChatHistory(prev=>[...prev, {text:'Error: Failed to start session', sender:'system'}]);
        });
    }
    function handleDisconnect(){
        disconnect();
        setChatHistory(prev=>[...prev, {text:'Session ended', sender:'system'}]);
    }
    function sendMessage(){
        if(message.trim()){
            setChatHistory(prev=>[...prev, {text:message, sender:'user'}]);
            setMessage('');
        }
    }
    return(
        <div>
            <div>
                {chatHistory.map((chat, index)=>(
                    <div key={index} className={`mb-4 flex ${chat.sender==='user'?'justify-end':'justify-start'}`} >
                        <span className={`inline-block p-2.5 rounded-xl max-w-[70%] ${chat.sender==='user'?'bg-blue-600':'bg-gray-600'}`}>
                            <p className="text-white">{chat.text}</p>
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    onClick={readyState===VoiceReadyState.OPEN ? handleDisconnect : handleConnect}
                    disabled={requestingPermission}
                >
                    {requestingPermission ? ('Requesting permissions...') :
                    readyState === VoiceReadyState.OPEN ? (<MicOff size={48} />) : (<Mic size={48}/>)}
                </button>
            </div>
        </div>
    )
}