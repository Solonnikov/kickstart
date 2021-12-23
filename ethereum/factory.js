import web3 from './web3';
import CampaignFactory from './build/CampaignFactory';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xbb1F3914CfAcDfAC2a0EA9025D8568a61A7912c4'
);

export default instance;

