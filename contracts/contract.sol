

// SPDX-License-Identifier: MIT

// d8888b. d88888b db    db d888888b d88888b db   d8b   db      .88b  d88. d888888b d8b   db d888888b 
// 88  `8D 88'     88    88   `88'   88'     88   I8I   88      88'YbdP`88   `88'   888o  88 `~~88~~' 
// 88oobY' 88ooooo Y8    8P    88    88ooooo 88   I8I   88      88  88  88    88    88V8o 88    88    
// 88`8b   88~~~~~ `8b  d8'    88    88~~~~~ Y8   I8I   88      88  88  88    88    88 V8o88    88    
// 88 `88. 88.      `8bd8'    .88.   88.     `8b d8'8b d8'      88  88  88   .88.   88  V888    88    
// 88   YD Y88888P    YP    Y888888P Y88888P  `8b8' `8d8'       YP  YP  YP Y888888P VP   V8P    YP    
                                                                                                   
                                                                                                     

// By BraverElliot.eth
                                                                                                                                                                         


pragma solidity ^0.8.7;

contract reviewMintContract{


    mapping(address => uint) public skillRating1;
    mapping(address => uint) public skillRating2;
    mapping(address => uint) public skillRating3;
    mapping(address => uint) public skillRating4;
    mapping(address => uint) public skillRating5;


    mapping(address => uint) public skillRatingnumber1;
    mapping(address => uint) public skillRatingnumber2;
    mapping(address => uint) public skillRatingnumber3;
    mapping(address => uint) public skillRatingnumber4;
    mapping(address => uint) public skillRatingnumber5;






    mapping(address => string) public skillName1;
    mapping(address => string) public skillName2;
    mapping(address => string) public skillName3;
    mapping(address => string) public skillName4;
    mapping(address => string) public skillName5;


    function setSkills(string memory _skillName1, string memory _skillName2, string memory _skillName3, string memory _skillName4,string memory _skillName5) public payable {
        skillName1[msg.sender] = _skillName1;
        skillName2[msg.sender] = _skillName2;
        skillName3[msg.sender] = _skillName3;
        skillName4[msg.sender] = _skillName4;
        skillName5[msg.sender] = _skillName5;
    }


    function addReview(uint _rating1,uint _rating2,uint _rating3,uint _rating4,uint _rating5) public payable {
        skillRating1[msg.sender]+=_rating1;
        skillRating2[msg.sender]+=_rating2;
        skillRating3[msg.sender]+=_rating3;
        skillRating4[msg.sender]+=_rating4;
        skillRating5[msg.sender]+=_rating5;

        if(_rating1==0){skillRatingnumber1[msg.sender]+=0;}else{skillRatingnumber1[msg.sender]+=1;}
        if(_rating2==0){skillRatingnumber1[msg.sender]+=0;}else{skillRatingnumber2[msg.sender]+=1;}
        if(_rating3==0){skillRatingnumber1[msg.sender]+=0;}else{skillRatingnumber3[msg.sender]+=1;}
        if(_rating4==0){skillRatingnumber1[msg.sender]+=0;}else{skillRatingnumber4[msg.sender]+=1;}
        if(_rating5==0){skillRatingnumber1[msg.sender]+=0;}else{skillRatingnumber5[msg.sender]+=1;}

    }
}