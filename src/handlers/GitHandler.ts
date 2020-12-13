import { l, exec, lm } from "../lib/helpers"

const fs = require('fs')


export default class GitHandler {

    /**
     * Last commit id
     */
    private lastCommitId: string

    /**
     * Files 
     */
    private files: Array<string>

    constructor() {
        this.init()
    }

    /**
     * Initialise the git state and get last commit id
     */
    private init() {
        if (this.isGitInitialized()) {
            this.commit()
            this.lastCommitId = this.getLastCommit()
        } else {
            this.initializeGit()
            this.commit()
            this.lastCommitId = this.getLastCommit()
        }
        this.loadFiles()
    }

    /**
     * Check if this is a Git repo
     */
    private isGitInitialized(): boolean {
        return fs.existsSync('.git')
    }

    /**
     * Initialize Git
     */
    private initializeGit() {
        lm(`Initialising git..`)
        exec(`git init`)
    }

    /**
     * Run git add then git commit
     */
    private commit() {
        lm(`Commiting files`)
        exec(`git add .`)
        exec(`git commit -m "Ftp commit ${new Date}"`)
    }

    /**
     * Get the last commit
     */
    private getLastCommit(): string {
        lm(`Getting last commit`)
        const res = exec('git log --oneline')
        let out = this.toArray(res)
        return out[0].split(" ")[0];
    }

    /**
     * Get the list of files from the last commit
     */
    private loadFiles() {
        const res = exec(`git diff --name-only ${this.lastCommitId}^..${this.lastCommitId} --diff-filter=ACMRTUXB`)
        const out = this.toArray(res)
        this.files = out
    }

    /**
     * Return the list of files
     */
    public getFiles() {
        return this.files
    }

    /**
     * Convert the list output to array
     */
    private toArray(string:string) {
        let arr = string.split("\n")
        arr.pop()
        return arr
    }
}