let choosesContainer = document.querySelector(".choosesContainer select")
let btnsubmit = document.querySelector(".btnSubmit")
let alphaValueObj = {}
let numberValueObj = {}

for(let i = 1;i <= 26;i++){
    numberValueObj[String.fromCharCode(96 + i)] = i
}
for(let i = 1;i <= 26;i++){
   alphaValueObj[i] = String.fromCharCode(96 + i)
}
const btnchage = () => {
    choosesContainer.value === "Decrypt"? btnsubmit.textContent = "Decrypt" : btnsubmit.textContent = "Encrypt"
}
btnchage()
choosesContainer.addEventListener("change", btnchage)

let decryption = () => {

    let multiplier = document.getElementById("multiplier")
    let operator = document.getElementById("operation")
    let shift = document.getElementById("shift")
    let mod = document.getElementById("mod")
    let texttodecrypt = document.getElementById("texttodecrypt")
    let encrypDecrypValue = document.querySelector(".encrypDecrypValue p")

    let decrypted = ""
    let multiplicative = 0
    mod = parseInt(mod.value)
    multiplier = parseInt(multiplier.value)
    multiplier = multiplier % mod
    shift = parseInt(shift.value)
    operator = operator.value
    texttodecrypt = texttodecrypt.value
    texttodecrypt = texttodecrypt.toLowerCase()

    while(multiplicative < mod){
        if(multiplier * multiplicative % mod == 1){
            for(let m = 0; m <= texttodecrypt.length - 1; m++){
                let everyChar = texttodecrypt.charAt(m)
               
                let everyCharNumValue = numberValueObj[everyChar]
                
                if(everyCharNumValue){
                    if(choosesContainer.value == 'Decrypt'){
                        if(operator == '+'){
                            y = (multiplicative * (everyCharNumValue - shift + mod)) % mod;
                        }else{
                            y = (multiplicative * (everyCharNumValue + shift + mod)) % mod;
                        }
                    }else{
                        if(operator == "-"){
                            y = ((multiplier * everyCharNumValue) - shift + mod) % mod;
                            
                        }else{
                            y = ((multiplier * everyCharNumValue) + shift + mod) % mod;
                        }
                    }
                    decrypted += alphaValueObj[y] || ''; 
                }else{
                    decrypted += everyChar; 
                }
            }
            encrypDecrypValue.textContent = decrypted
            break
        }
        multiplicative++
    }

}


btnsubmit.addEventListener("click", decryption)