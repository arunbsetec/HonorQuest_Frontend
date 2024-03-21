exports.RPC_URL = "https://sepolia.infura.io/v3/28ac6f0db1e94b109f23173a97866058"
exports.Mumbai_RPC_URL="https://rpc-mumbai.maticvigil.com/"
exports.admin_PublicKey = "0x12670D72281Ab952b1aF42f4975a43762a597522"
exports.admin_PrivateKey = "bd916f645febe018b6ed74c13df485605edfd88916f470d5e1050b354e2f2754"

//==========L1=================

exports.Gen0 = "0x05DE499c96fFf56022e45bE13bFd588fad504e7E"
exports.Gen1 = "0xCd49a836F20D4FB8A8A7f200C6153C26d45F891B"
exports.L1NFT = "0x94485b5489c56D3F61dCC135ECb6943852019433"
exports.Horn = "0xc36dBa8309D0698a79566076c40E118c8844bDeB"
exports.Vault = "0x37a24fCc3cA227DF4f4af8958371a3C66D0fDF53"


//==========L2=================
exports.L2NFT = "0xEf90d8Cb31431Cc48142379A04acDC0182FF4dfB"
exports.Quest = "0xfEFA07F448dbF18a64c52a96AD96cf180372c81b"
exports.Training = "0x4a0e255B693f20e23a0FF20a05b5291f83E07894"
//"0x4a0e255B693f20e23a0FF20a05b5291f83E07894"







const nodeport = 4000;
exports.l2api = {
		stake: `http://localhost:${nodeport}/L2/stake`,
		unstake: `http://localhost:${nodeport}/L2/unstake`,
		stakedtokens:`http://localhost:${nodeport}/L2/mintedtokens`,
		tokenuri: `http://localhost:${nodeport}/L2/tokenuri`,
		gen0Signature: `http://localhost:${nodeport}/L2/gen0Signature`,
		getQuestStack : `http://localhost:${nodeport}/L2/getQueststack`,
		claimQuestReward: `http://localhost:${nodeport}/L2/claimQuestReward`,
		trainingStake: `http://localhost:${nodeport}/L2/trainingstack`,
		trainingUnstake: `http://localhost:${nodeport}/L2/trainingunstack`,
}
exports.Activity = {
	vaultStack: `http://localhost:${nodeport}/activity/vaultStack`,
	vaultUnstack: `http://localhost:${nodeport}/activity/vaultUnstack`,
	getAllActivity: `http://localhost:${nodeport}/activity/getAll`,
	getIdActivity: `http://localhost:${nodeport}/activity/getId`
}