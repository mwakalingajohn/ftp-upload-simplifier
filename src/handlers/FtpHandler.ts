import { Client } from "basic-ftp"
import { l, lm } from "../lib/helpers"
import ConfigHandler from "./ConfigHandler"

const ftp       = require("basic-ftp")

/**
 * Manages all ftp funct)ionalites
 */
export default class FtpHandler{

    /**
     * Config handler
     */
    private configHandler: ConfigHandler

    /**
     * Client object
     */
    private client: Client

    /**
     * Remote path for uploading the files on the server
     */
    private remotePath: string

    /**
     * Initialise config handler
     */
    constructor() {
        this.configHandler  = new ConfigHandler()
        this.client         = new ftp.Client()
    }

    /**
     * Connect to the ftp server
     */
    private async connect() {
        const config = await this.getConfig()
        lm(`Connecting to ftp`)
        this.remotePath = config.remote_path?"idash/":config.remote_path
        try {
            await this.client.access(config)
            return true
        } catch (error) {
            lm(`Connection failed, maybe incorrect config, try again or press Ctrl + C to exit.`)
            return false
        }
    }

    /**
     * Make connection to ftp server
     */
    private async makeConnection() {
        const connectionSuccess = await this.connect()
        if (connectionSuccess) this.configHandler.writeConfig()
        else {
            await this.makeConnection()   
        }
    }

    /**
     * Get ftp configurations
     * - Initialise the config first
     */
    private async getConfig() {
        await this.configHandler.initConfig()
        return  await this.configHandler.getConfig()
    }

    /**
     * Upload files to the ftp server one by one
     */
    public async uploadFiles(files: string[]) {
        const connect = await this.makeConnection()
        lm(`Uploading ${files.length} file(s) to server`)
        for (const file of files) {
            await this.uploadFile(file)            
        }
    }

    /**
     * Upload file to server using the client object
     */
    private async uploadFile(file: string) {
        let remote = this.remotePath + file
        try {
            lm(`Uploading ${file}... to ${remote}`)
            await this.client.uploadFrom(file, remote)
        } catch (error) {
            l(error)
        }
    }
}