"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { doLogin } from "@/services/Web3service";

export default function Home() {

  const {push} = useRouter();

  const [message, setMessage] = useState("");

  function btnLoginClick() {
    setMessage("User connecting... please wait...");
    doLogin()
      .then(account => push("/create"))
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      }) 
    
  }

  return (
    <>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img src="https://images.unsplash.com/photo-1520694478166-daaaaec95b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" className="d-block mx-lg-auto img-fluid" width="700" height="500"/>
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Welcome to Donate Crypto</h1>
            <p className="lead">Donate Crypto is a platform that allows you to donate your cryptocurrency to various charities and causes. We make it easy for you to support the causes you care about while also benefiting from the advantages of using cryptocurrency.</p>
            <p className="lead">With Donate Crypto, you can easily find and donate to your favorite charities, track your donations, and even receive tax benefits for your contributions.</p>
            <p className="lead mb-3">Join us in making a difference with your crypto donations today!</p>
            <div className="d-flex justify-content-start mt-5">
              <button type="button"className="btn btn-primary btn-lg px-4 me-2 col-12" onClick={btnLoginClick}>
                <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ymr3UNKopfI0NmUY95Dr-0589vG-91KuAA&s" width="64" className="me-2" />
                Connect with MetaMask
              </button>
            </div>
            {
              message? <div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div>
              :<></>
            }            
          </div>
        </div>
      </div>
    </>
  );
}