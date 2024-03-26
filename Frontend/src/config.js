exports.RPC_URL = "https://sepolia.infura.io/v3/28ac6f0db1e94b109f23173a97866058"
exports.Mumbai_RPC_URL="https://rpc-mumbai.maticvigil.com/"
exports.admin_PublicKey = "0x12670D72281Ab952b1aF42f4975a43762a597522"
exports.admin_PrivateKey = "bd916f645febe018b6ed74c13df485605edfd88916f470d5e1050b354e2f2754"

//==========L1=================

exports.Gen0 = "0x099FbD32849De4ec33BA119efA031Eb62a2A1221"
exports.Gen1 = "0x4339213AbBE49394D1046Bd728Cb8500D6FcCb62"
exports.L1NFT = "0x9A7E5c592Db02124A483Ba3F967A327A347f2011"
exports.Horn = "0xf718C8df52628235b1dd73EC23F8d46B187947E6"
exports.Vault = "0xf06579419ddDb1f50Be48a0dc1D5676aba7C4946"
exports.Claim = "0x319f08d2DA139370638916c93c6A8CaA902c4fC0"


//==========L2=================
exports.L2NFT = "0xCa7E88ba3A2dC491Df644c73420977cbC9Ed650B"
exports.Quest = "0x118A3c3Ae723679C5dE2179767e9c35cDB8Cc37F"
exports.Training = "0x684cb9f80524fBa46749611Cdc9c661eD161f4D4"
//"0x4a0e255B693f20e23a0FF20a05b5291f83E07894"







const nodeport = 4000;
exports.l2api = {
		stake: `http://localhost:${nodeport}/L2/stake`,
		unstake: `http://localhost:${nodeport}/L2/unstake`,
		stakedtokens:`http://localhost:${nodeport}/L2/mintedtokens`,
		tokenuri: `http://localhost:${nodeport}/L2/tokenuri`,
		gen0Signature: `http://localhost:${nodeport}/L2/gen0Signature`,
		gen1Signature: `http://localhost:${nodeport}/L2/gen1Signature`,
		getQuestStack : `http://localhost:${nodeport}/L2/getQueststack`,
		claimQuestReward: `http://localhost:${nodeport}/L2/claimQuestReward`,
		trainingStake: `http://localhost:${nodeport}/L2/trainingstack`,
		trainingUnstake: `http://localhost:${nodeport}/L2/trainingunstack`,
		claimSignature: `http://localhost:${nodeport}/L2/claimSignature`
}
exports.Activity = {
	vaultStack: `http://localhost:${nodeport}/activity/vaultStack`,
	vaultUnstack: `http://localhost:${nodeport}/activity/vaultUnstack`,
	getAllActivity: `http://localhost:${nodeport}/activity/getAll`,
	getIdActivity: `http://localhost:${nodeport}/activity/getId`,
	claimReward: `http://localhost:${nodeport}/activity/claimReward`
}