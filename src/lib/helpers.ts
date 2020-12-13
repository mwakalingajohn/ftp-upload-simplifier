const { execSync }  = require("child_process")
const sp            = require("synchronized-promise") 

/**
 * Log messages to console
 * @param message Any message to display on the terminal
 */
export const l = (message: any) => console.log(message)

/**
 * Log messages to console
 * @param message Any message to display on the terminal
 */
export const lm = (message: string) => console.log(`# ${message}`)

/**
 * Get arguments from console
 * @param key The name of the command line argument if any
 */
export const args = (key: string) => {
    let args = process.argv.slice(2)
    let a = args.findIndex(v => v.search(key) !== -1)
    return args[a]?args[a].split('=')[1]:undefined
}

/**
 * Safely run a function
 * @param callback The callback function to be run inside try catch
 */
export const tryc = (callback: () => any) => {
    try {
        return callback()
    } catch (error) {
        console.log(error)
        return null
    }
}

/**
 * Execute terminal commands
 * @param command The command to be run on the terminal
 */
export const exec = (command: string): any => {
    try {
        const res = execSync(command)
        return res.toString();
    } catch (e) {
        return null
    }
}

/**
 * Run synchronously async functions
 */
export const runSync = (fun: any, ...args:any) => {
    const funSync = sp(fun)
    const res = funSync(...args)
    return res
}