import Config from "../interfaces/config.interface"
import { l, lm, tryc } from "../lib/helpers"
import InquiryHandler from "./InquiryHandler"

const fs        = require('fs')

export default class ConfigHandler {

    /**
     * Name to be used for config file
     */
    private configFileName: string = 'gep.json'

    /**
     * Config file directory
     * Current directory by default
     */
    private configFileDirectory: string = './'

    /**
     * Ftp configuration
     */
    private config: any

    /**
     * Inquirer object
     */
    private inquirer: InquiryHandler

    /**
     * Initialise inquirer, we will need it
     */
    constructor() {
        this.inquirer = new InquiryHandler
    }

    /**
     * Initialise configuration by fetching
     */
    public async initConfig() {
        if (this.configFileExists()) this.getConfigFromFile()
        else await this.getConfigFromUser()        
    }

    /**
     * Get config from json configuration file
     */
    private getConfigFromFile() {
        this.config = this.readConfig()
    }

    /**
     * Get config from the user
     */
    private async getConfigFromUser() {
        lm("Provide connection cofiguration")
        this.config = await this.askConfigFromUser()
    }

    /**
     * Check if the config file exists
     */
    private configFileExists() {
        return fs.existsSync(this.getConfigFilePath())
    }

    /**
     * Get the path of config file
     */
    private getConfigFilePath() {
        return `${this.configFileDirectory}${this.configFileName}`
    }

    /**
     * Write ftp configuration to file
     */
    public writeConfig() {
        if (!this.configFileExists())
            fs.writeFile(this.getConfigFilePath(), this.getStringConfig(), (err:any) => {
                if (err) throw err
                lm(`Configuration is saved to ${this.getConfigFilePath()}`)
            })
    }

    /**
     * Read ftp configuration from file
     */
    private readConfig() {
        lm(`Reading config from ${this.getConfigFilePath()}`)
        if (this.configFileExists())
            return tryc(() => JSON.parse(fs.readFileSync(this.getConfigFilePath())))        
        return null
    }

    /**
     * Get a stringified config
     */
    private getStringConfig() {
        return JSON.stringify(this.config, null, 4)
    }

    /**
     * Get config from user by asking questions
     */
    private async askConfigFromUser(){
        return await this.inquirer.ask(this.getConfigQuestions())
    }

    /**
     * Get the list of config questions
     */
    private getConfigQuestions(): {}[] {
        return new Array(
            { type: "input", name: "host", message: "What is the host name?" },
            { type: "input", name: "user", message: "What is the user name?" },
            { type: "input", name: "password", message: "What is the ftp password?" },
            { type: "confirm", name: "secure", message: "Use secure connection?", default: false },
            { type: "input", name: "remotePath", message: "Enter remote path", default: "/" }
        )
    }

    /**
     * Get config object
     */
    public getConfig() {
        return this.config
    }
}