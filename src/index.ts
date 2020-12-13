import FtpHandler from "./handlers/FtpHandler";
import GitHandler from "./handlers/GitHandler";
import { lm } from "./lib/helpers";

const ftpHandler    = new FtpHandler
const gitHandler    = new GitHandler
const files         = gitHandler.getFiles()

const main = async () => {
    
    // Upload files to the server
    await ftpHandler.uploadFiles(files)
    
    // we're done baby :D
    lm(`Upload complete, thank you!`)
    process.exit()
}

main()