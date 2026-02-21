"use client"

import { use, useEffect, useState } from "react";
import { getCampaign, donate } from "@/services/Web3service";
import { useParams } from "next/navigation";
import Web3 from "web3";

export default function Donate() {

    const params = useParams();

    const [message, setMessage] = useState("");
    const [campaign, setCampaign] = useState({});
    const [donation, setDonation] = useState(0);

    useEffect(() => {
        setMessage("Loading campaign... please wait...");
        getCampaign(params.id)
            .then(result => {
                setMessage("");
                result.id = params.id;
                console.log(result);
                setMessage(JSON.stringify(result));
                setCampaign(result);
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }, [])

    function onDonationChange(evt) {
        setDonation(evt.target.value);
    }

    function btnDonateClick() {
        setMessage(`Processing donation... please wait...`);
        donate(campaign.id, donation)
            .then(tx => {
                setMessage("Thank you for your donation! In a few moments, the campaign will be updated with the new balance.");
                setDonation(0);
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }
    
    return(
        <>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
                <p>Check Cause details to donate...</p>
                <hr />
                <div className="row flex-lg-row-reverse align-items-center g-5">
                    <div className="col-7">
                        {
                            campaign.videoUrl
                            ? <iframe width="100%" height="480" src={`https://www.youtube.com/embed/${campaign.videoUrl}`}></iframe>
                            : <img src={campaign.imageUrl} className="d-block mx-lg-auto img-fluid" width="640" height="480"></img>
                        }
                    </div>
                    <div className="col-5 mb-5" style={{ height: 480, scrollbars: true }}>
                        <h2 className="display-5 fw-bold">{campaign.title}</h2>
                        <p><strong>Author: </strong>{campaign.author}</p>
                        <p className="mb-3">{campaign.description}</p>
                        <p className="mb-3 fst-italic mt-5">
                            So, what did you think of the cause? It has already raised {Web3.utils.fromWei(campaign.balance || 0, "ether")} POL.
                            How much would you like to donate? Just click the button below and confirm the transaction in your wallet. Every contribution counts and helps make a difference!
                        </p>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type="number" id="donation" className="form-control p-3 w-50" value={donation} onChange={onDonationChange} />
                                <span className="input-group-text">POL</span>
                                <button type="button" className="btn btn-primary p-3 w-25" onClick={btnDonateClick}>Donate</button>
                            </div>
                        </div>                    
                    </div>
                    {
                        message
                        ? <div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div>
                        :<></>
                    }
                </div>
            </div>
        </>
    )
}

