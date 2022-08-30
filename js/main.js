const input = document.getElementById("input")
const output = document.getElementById("terminal")

var commandHistory = []
var selectedHistory = commandHistory.length

var files = {"localhost":[{
    "README.md": "Hello, World!"
}]}
var currentDir = "localhost"

const keyUp = (event) => {
    if (event.keyCode === 13) {
        let time = new Date
        const args = input.value.split(/\s+/g)
        const command = args.shift()
        output.innerHTML = `${output.innerHTML}<br><span class="blue">[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]</span> <span class="cyan">>&nbsp</span><span class="blue">${command + " " + args.join(" ")}</span>`
        switch (command) {
            case "banner":
                commandOutput = "<span class='yellow'>_____                          ___   _____  <br>|_   _|                        / _ \\ |_   _|<br>  | |    ___  _ __  _ __ ___  / /_\\ \\  | |  <br>  | |   / _ \\| '__|| '_ ` _ \\ |  _  |  | | <br>  | |  |  __/| |   | | | | | || | | | _| |_ <br>  \\_/   \\___||_|   |_| |_| |_|\\_| |_/ \\___/ <br></span><span class='magenta'><i>Hint: Use <b>help</b> For A List of Commands!</i></span>"
                break
            case "cat":
                commandOutput = `` 
                break
            case "clear":
                commandOutput = ""
                output.innerHTML = ""
                break
            case "echo":
                if (args[0] === "-f") {
                    commandOutput = ``
                } else commandOutput = `<span class="green">${args.join(" ")}</span>`
                break
            case "help":
                let help = [
                    '<span class="cyan">Banner</span>      <span class="blue">| Prints Out The Banner</span>',
                    '<span class="cyan">Clear</span>       <span class="blue">| Clears The Terminal</span>', 
                    '<span class="cyan">Echo</span>        <span class="blue">| Prints A Message</span> <span class="magenta">-f [file]</span>', 
                    '<span class="cyan">Help</span>        <span class="blue">| Displays This Message</span>',
                    '<span class="cyan">Ls</span>          <span class="blue">| Prints Out The All The Files</span>'
                ]
                commandOutput = `<span class="green">Showing Help Page:</span><br><br>${help.join("<br>")}`
                break
            case "ls":
                commandOutput = `<span class="">${files.currentDir}</span>`
                break
            default:
                commandOutput = `<span class="red">Unknown Command <b>${command}</b>! Use <b>help</b> For A List Of Commands.</span>`
                break
        }

        commandHistory.push(command + " " + args.join(" "))
        selectedHistory = commandHistory.length
        output.innerHTML = `${output.innerHTML}<br>${commandOutput}`
        
        input.value = ""
    }
    input.focus()
}

const keyDown = (event) => {
    input.focus()
    if (event.keyCode === 38) {
        if (commandHistory[selectedHistory] !== undefined)
            input.value = commandHistory[selectedHistory]
            selectedHistory--
    }
    input.focus()
    if (event.keyCode === 40) {
        if (commandHistory[selectedHistory] !== undefined)
            input.value = commandHistory[selectedHistory]
            selectedHistory++
    }
}

document.addEventListener("keyup", keyUp)
document.addEventListener("keydown", keyDown)

setInterval(() => {
    let time = new Date
    document.getElementById("prompt").innerHTML = `<span class="cyan">AI064@localhost:8888</span> <span class="blue">[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]</span><br><span class="green">$</span>`
}, 50)
