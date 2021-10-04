// CONFIGURE HERE THE VARIABLES THAT WILL BE CHANGED BEFORE THE PRESALE

//----------------------------------------------------------------------------------------------------------------------------------------------

// Labo ADDRESSES

const LaboUstAddr = '0xfe01836ab9ee630266184cd11bd21edab4b6e2ec'
const LaboBnbAddr = '0x62287501af0b35e5c818ff95fe789218a9aa156d'
const LaboUstAddrV2 = '0xfe01836ab9ee630266184cd11bd21edab4b6e2ec'
const LaboBnbAddrV2 = '0x62287501af0b35e5c818ff95fe789218a9aa156d'
const LaboAddr = '0x86C602B59fe35e18f22eD4d7557BF75ec53E9C1f'
const masterChef = '0x0c1A3bd0F18801A4F114F5bb445Ea23AcEe8d310'
// testnet addresses
const LaboBusdAddrTestnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' // MIS-BUSD LP
const LaboBnbAddrTestnet = '0x31222d37568bd54be95ece3749f0559c45a85634' // MIS-WONE LP
const LaboBusdAddrV2Testnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' // MIS-BUSD LP
const LaboBnbAddrV2Testnet = '0x31222d37568bd54be95ece3749f0559c45a85634' // MIS-BUSD LP
const LaboAddrTestnet = '0xF2f587fD8A423880037F39828d593d4cE1961A98' // MIS ADDRESS
const masterChefTestnet = '0xDd62435ca34666f65c32ED62eA5331b2128ED262' // MIS MASTERCHEF

// Labo RELATED PIDS

const pidLaboUst = 0
const pidLaboBnb = 1
const pidLabo = 2

// OTHER PIDS THAT ARE REFERENCED THROUGHOUT THE CODE

const pidBnbBusd = 3

// SET countBack TO TRUE TO COUNT BACK AS FAR AS countLength

const countBack = false
const countLength = 2

// CHANGE Labo FOR THE TOKEN BEIGN TESTED

const xPerBlock = "laboPerBlock" // referenced in getMasterChefAddress()
const pendingX = "pendingLabo"

// SEARCH AND REPLACE THIS STRING IF USING ANY OTHER THAN LABO: await masterChefContract.methods.pendingLabo in \src\state\pools\fetchPoolsUser.ts

// USE OUR CUSTOM WAY OF FETCHING PRICE

const fetchAutomatic = false;
const fetchPriceCustom = false;

// BitQuery RESPONSE POSITIONS

const busdPosition = 0
const tokenPosition = 1

// IS LOCKED

const unlockWalletButton = false;

// IS FARMS CONFIGURED

const isFullyConfigured = true;
const showFarmInfoModal = true;


//----------------------------------------------------------------------------------------------------------------------------------------------

// EDIT ABOVE NOT HERE

const labo = {
    addr: {
        LaboUstAddr,
        LaboBnbAddr,
        LaboUstAddrV2,
        LaboBnbAddrV2,
        LaboAddr,
        masterChef,
        LaboBusdAddrTestnet,
        LaboBnbAddrTestnet,
        LaboBusdAddrV2Testnet,
        LaboBnbAddrV2Testnet,
        LaboAddrTestnet,
        masterChefTestnet,
    },
    pids: {
        pidLaboUst, 
        pidLaboBnb,
        pidLabo,
        pidBnbBusd,
        pidList: [
            pidLaboUst, // Labo-BUSD LP [0]
            pidLaboBnb, // Labo-BNB LP [1]
            pidLabo, // Labo [2]
            pidBnbBusd, // BNB-BUSD LP [3]
            4, // ONE-1ETH LP [4]
            /* 2, // BTCB-BNB LP [4]
            3, // ETH-BNB LP [5]
            4, // DAI-BUSD LP [6]
            5, // USDC-BUSD LP [7]
            6, // DOT-BNB LP [8]
            7, // CAKE-BUSD LP [9]
            8, // CAKE-BNB LP [10] */
            // pidLabo, // Labo [3]
            /* 10, // BUSD [12]
            11, // WBNB [13]
            12, // EGG [14]
            18, // BTCB [15]
            14, // ETH [16]
            15, // DAI [17]
            16, // USDC [18]
            17, // DOT [19]
            19, // BSCX [20]
            13, // AUTO [21]
            22, // Labo-GYA [22]
            23, // Labo-DSL [23]
            24, // Labo-BUSD LP V2 [24]
            25, // Labo-BNB LP V2 [25]
            26, // BUSD-BNB LP V2 [26]
            27, // USDT-BUSD LP V2 [27]
            28, // BTCB-BNB LP V2 [28] 
            29, // ETH-BNB LP V2 [29]
            30, // DAI-BUSD LP V2 [30] 
            31, // USDC-BUSD LP V2 [31]
            31, // DOT-BNB LP V2 [32]
            32, // CAKE-BNB LP V2 [33]
            33, // ADA-WBNB LP V2 [34] */


        ],
    },
    strings: {
        xPerBlock,
        pendingX
    },
    fetch: {
        fetchAutomatic,
        fetchPriceCustom
    },
    queryPosition: {
        busd: busdPosition,
        token: tokenPosition
    },
    isLocked: {
        unlockWalletButton
    },
    isFullyConfigured,
    showFarmInfoModal
}
 
export default labo;