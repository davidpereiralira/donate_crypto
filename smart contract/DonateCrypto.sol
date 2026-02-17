//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

struct Campaign {
    address author;
    string title;
    string description;
    string videoUrl;
    string imageUrl;
    uint256 balance;
    bool active;
}

contract DonateCrypto {

    uint256 public fee = 100;//wei

    uint256 public nextId = 0;

    mapping(uint256 => Campaign) public campaigns; //id => campanha
    
    function addCampaign(string calldata title, string calldata description, string calldata videoUrl, string calldata imageUrl) public {
        Campaign memory newCampaign;
        newCampaign.author = msg.sender;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.videoUrl = videoUrl;
        newCampaign.imageUrl = imageUrl;
        newCampaign.active = true;

        nextId++;
        campaigns[nextId] = newCampaign;
    }

    function donate(uint256 id) public payable {
        require(msg.value > 0, "You must send a donation value > 0");
        require(campaigns[id].active == true, "This campaign is expired");

        campaigns[id].balance += msg.value;
    }

    function withdraw(uint256 id) public {
       
        Campaign memory campaign = campaigns[id];
        require(campaign.author == msg.sender, "You do not rave permission");
        require(campaign.active == true, "This campaign is expired");
        require(campaign.balance > fee, "This campaign dos not have balance");

        address payable recipient = payable(campaign.author);
        recipient.call{value: campaign.balance - fee}("");
        
        campaigns[id].active = false;
    }

}