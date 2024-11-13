"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const AccountType = {
    Normal: "Brukskonto",
    Saving: "Sparekonto",
    Credit: "Kredittkonto",
    Pension: "Pensjonskonto"
};

printOut(AccountType.Normal + ", " + AccountType.Saving + ", " + AccountType.Credit + ", " + AccountType.Pension);

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class BankAccount {
    constructor(type){
        this.type = type;

    }
    toString()  {
        return this.type;
    }

    setType(newType){
        printOut("Account is changed form" + this.type + " to " + newType);
        this.type = newType;

    }
}

const MyAccount = new BankAccount(" Brukskonto");
printOut("myAccount =" + MyAccount.toString());

MyAccount.setType(" Sparekonto");

printOut("myAccount =" + MyAccount.toString());
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

class BankAccount1 {
    #type;
    #balance;
    constructor(initialType){
        this.#type = initialType;
        this.#balance = 0;
    }

    toString() {
        return this.#type;
    }

    setType(newType) {
        printOut("Account is changed from " + this.#type + " to " + newType);
        this.#type = newType;
    }

    getBalance() {
        return this.#balance;
    }

    deposit(amount) {
        this.#balance += amount;
        printOut("Deposit of " + amount + ", new balance is " + this.#balance);
    }

    withdraw(amount) {
        this.#balance -= amount;
        printOut("Withdrawal of " + amount + ", new balance is " + this.#balance);
    }
}
const myAccount1 = new BankAccount1("Brukskonto");
myAccount1.deposit(100);
myAccount1.withdraw(25);
printOut("My account balance is " + myAccount1.getBalance());

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

class BankAccount2 {
    #type;
    #balance;
    #withdrawalCounter 

    constructor(initialType) {
        this.#type = initialType;
        this.#balance = 0;
        this.withdrawalCounter = 0;
    }

    toString() {
        return this.#type;
    }

    setType(newType) {
        printOut("account is changed from " + this.#type.toLowerCase() + " to " + newType.toLowerCase());
        this.#type = newType; 
        this.#withdrawalCounter = 0;
    }

    getBalance() {
        return this.#balance;
    }

    deposit(amount) {
        this.#balance += amount;
        this.#withdrawalCounter = 0;
        printOut("deposit of " + amount + ", new balance is " + this.#balance);
    }

    withdraw(amount) {
        switch (this.#type) {
            case "Pensionskonto":
                printOut("you can't withdraw from a pensionskonto!");
                break;
            
            case "Sparekonto":
                if (this.#withdrawalCounter >= 3) {
                    printOut("You can't withdraw from a Sparekonto more than three times!");
                } else {
                    this.#balance -= amount;
                    this.#withdrawalCounter++;
                    printOut("Withdrawal of " + amount + ", new balance is " + this.#balance);
                }
                break;
            default:
                this.#balance -= amount;
                printOut("Withdrawal of " + amount + ", new balance is " + this.#balance);
        }
    }
}
const myAccount2 = new BankAccount2("Sparekonto");
myAccount2.deposit(25);
myAccount2.deposit(75);
myAccount2.withdraw(30);
myAccount2.withdraw(30);
myAccount2.withdraw(30);
myAccount2.withdraw(30);
myAccount2.setType("Pensionskonto");
myAccount2.withdraw(30);
myAccount2.setType("Sparekonto");
myAccount2.withdraw(10);
    

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/


const currencyTypes = { 
    NOK: {value:1.00000, name: "Norske kroner", denomination: "kr" }, 
    EUR: {value:0.0985, name: "Europeiske euro", denomination: "€" }, 
    USD: {value:0.1091, name: "United States dollar", denomination: "$" }, 
    GBP: {value:0.0847, name: "Pound sterling", denomination: "£" }, 
    INR: {value:7.8309, name: "Indiske rupee", denomination: "र" }, 
    AUD: {value:0.1581, name: "Australienske dollar", denomination: "A$" }, 
    PHP: {value:6.5189, name: "Filippinske peso", denomination: "₱" }, 
    SEK: {value:1.0580, name: "Svenske kroner", denomination: "kr" }, 
    CAD: {value:0.1435, name: "Canadiske dollar", denomination: "C$" }, 
    THB: {value:3.3289, name: "Thai baht", denomination: "฿" }

};

class BankAccount3{
    constructor(type, balance = 0) {
        this.type = type;
        this.balance = balance;
        this.withdrawCount = 0; 
        this.currencyType = "NOK"; 
    }

    toString() {
        return this.type;
    }

    setType(newType) {
        printOut("Account is changed from " + this.type + " to " + newType);
        this.type = newType;
        this.withdrawCount = 0; 
    }

    getBalance() {
        return this.balance;
    }

    deposit(amount) {
        this.balance += amount;
        printOut(`Deposit of ${amount}${currencyTypes[this.currencyType].denomination}
            , new balance is ${this.balance}${currencyTypes[this.currencyType].denomination}`);
        this.withdrawCount = 0; 
    }

    withdraw(amount) {
        switch (this.type) {
            case "Saving":
                if (this.withdrawCount >= 3) {
                    printOut("You can't withdraw from a Saving account more than three times!");
                    return;
                }
                break;
            case "Pension":
                printOut("You can't withdraw from a Pension account!");
                return;
        }

        if (amount > this.balance) {
            printOut("Insufficient balance for withdrawal of " + amount);
        } else {
            this.balance -= amount;
            this.withdrawCount++; 
            printOut("Withdrawal of " + amount + ", new balance is " + this.balance);
        }
    }

    setCurrencyType(newCurrency) {
        if (this.currencyType === newCurrency) {
            return; 
        }
        if (CurrencyTypes[newCurrency]) {
            this.currencyType = newCurrency;
            printOut("Currency changed to " + newCurrency);
        } else {
            printOut("Invalid currency type!");
        }
    }
}

const myAccount5 = new BankAccount3("Normal", 0);

myAccount5.setCurrencyType("NOK");
myAccount5.deposit(150); 

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
class BankAccount4 {
    constructor(type, balance = 0) {
        this.type = type;
        this.balance = parseFloat(balance); 
        this.withdrawCount = 0; 
        this.currencyType = "NOK"; 
    }

    toString() {
        return this.type;
    }

    setType(newType) {
        printOut("Account is changed from " + this.type + " to " + newType);
        this.type = newType;
        this.withdrawCount = 0; 
    }

    getBalance() {
        return parseFloat(this.balance).toFixed(2) + currencyTypes[this.currencyType].denomination;
    }

    deposit(amount) {
        this.balance += parseFloat(amount);  
        printOut(`Deposit of ${amount}${currencyTypes[this.currencyType].denomination}, new balance is ${this.getBalance()}`);
        this.withdrawCount = 0; 
    }

    withdraw(amount) {
        switch (this.type) {
            case "Saving":
                if (this.withdrawCount >= 3) {
                    printOut("You can't withdraw from a Saving account more than three times!");
                    return;
                }
                break;
            case "Pension":
                printOut("You can't withdraw from a Pension account!");
                return;
        }

        if (amount > this.balance) {
            printOut("Insufficient balance for withdrawal of " + amount);
        } else {
            this.balance -= parseFloat(amount);  
            this.withdrawCount++; 
            printOut("Withdrawal of " + amount + ", new balance is " + this.getBalance());
        }
    }

    
    #currencyConvert(newCurrencyType) {
        const oldCurrencyValue = currencyTypes[this.currencyType].value;
        const newCurrencyValue = currencyTypes[newCurrencyType].value;
        this.balance = parseFloat((this.balance * newCurrencyValue / oldCurrencyValue).toFixed(2));  
    }

    
    setCurrencyType(newCurrency) {
        if (this.currencyType === newCurrency) {
            return; 
        }
        if (currencyTypes[newCurrency]) {
            printOut(`The account currency has changed from ${currencyTypes[this.currencyType].name} to ${currencyTypes[newCurrency].name}`);
            this.#currencyConvert(newCurrency);
            this.currencyType = newCurrency;
            printOut(`New balance is ${this.getBalance()}`);
        } else {
            printOut("Invalid currency type!");
        }
    }
}


const myAccount6 = new BankAccount4("Normal", 150);


myAccount6.setCurrencyType("SEK"); 
myAccount6.setCurrencyType("USD"); 
myAccount6.setCurrencyType("NOK"); 

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

class BankAccount5 {
    constructor(type, balance = 0) {
        this.type = type;
        this.balance = balance;
        this.withdrawCount = 0;
        this.currencyType = "NOK"; 
    }


    setType(newType) {
        printOut("Account is changed from " + this.type + " to " + newType);
        this.type = newType;
        this.withdrawCount = 0;
    }

  
    deposit(amount, aType = "NOK") {
        const depositCurrencyValue = currencyTypes[aType].value;
        const currentCurrencyValue = currencyTypes[this.currencyType].value;
        
        const convertedAmount = (amount * depositCurrencyValue) / currentCurrencyValue;
        this.balance += convertedAmount;
        
        printOut(`Deposit of ${amount.toFixed(2)} ${currencyTypes[aType].name}
        , new balance is ${this.balance.toFixed(2)}${currencyTypes[this.currencyType].denomination}`);
        this.withdrawCount = 0;
    }

    withdraw(amount, aType = "NOK") {
        const withdrawCurrencyValue = currencyTypes[aType].value;
        const currentCurrencyValue = currencyTypes[this.currencyType].value;
        
        const convertedAmount = (amount * withdrawCurrencyValue) / currentCurrencyValue;

        if (convertedAmount > this.balance) {
            printOut("Insufficient balance for withdrawal of " + amount);
            return;
        }

        this.balance -= convertedAmount;
        printOut(`Withdrawal of ${amount.toFixed(2)} ${currencyTypes[aType].name},
         new balance is ${this.balance.toFixed(2)}${currencyTypes[this.currencyType].denomination}`);
    }

    setCurrencyType(newCurrency) {
        if (this.currencyType === newCurrency) {
            return; 
        }
        if (currencyTypes[newCurrency]) {
            const oldCurrencyValue = currencyTypes[this.currencyType].value;
            const newCurrencyValue = currencyTypes[newCurrency].value;
            this.balance = (this.balance / oldCurrencyValue) * newCurrencyValue;

            printOut(`The account currency has changed from ${currencyTypes[this.currencyType].name} 
                to ${currencyTypes[newCurrency].name}`);
            this.currencyType = newCurrency; 
            printOut(`New balance is ${this.balance.toFixed(2)}${currencyTypes[this.currencyType].denomination}`);
        } else {
            printOut("Invalid currency type!");
        }
    }
}

const myAccount7 = new BankAccount5("Normal", 0);

myAccount7.deposit(12, "USD");  
myAccount7.withdraw(10, "GBP");  
myAccount7.setCurrencyType("CAD"); 
myAccount7.setCurrencyType("INR");  
myAccount7.setCurrencyType("SEK");  
myAccount7.withdraw(150.11, "SEK"); 


printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
function expandText(text, maxSize, char, insertBefore) { 
    while (text.length < maxSize) {
        if (insertBefore) {
            text = char + text; 
        } else {
            text = text + char; 
        }
    }
    return text;
}

const result = expandText("world", 12, "#", false); 

printOut(result); 
printOut(newLine);


