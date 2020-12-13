import Config from "../interfaces/config.interface"

const inquirer      = require("inquirer")

/**
 * Handle questions asked to the user
 */
export default class InquiryHandler{

    /**
     * Ask questions on the terminal and return promise containing
     * the answers.
     * @param questions 
     */
    ask(questions: {}[]): Promise<Config> {
        return inquirer.prompt(questions)
    }
}