import apiInstanceOxio, {oxioBaseURL} from '../InstanciasOxio/InstanceOxio'
import { stagingIccidList } from '../iccidListOxio/iccidListOxio'

const buildGetLinesURL = (oxioBaseURL, iccidList) => {
    const linesAsQueryParams = iccidList.map(iccid => `iccids=${iccid}`).join('&')
    return `${oxioBaseURL}lines?${linesAsQueryParams}`
}

export const getLinesBulk = async () => {
    try {
        const baseURL = oxioBaseURL
        const url = buildGetLinesURL(baseURL, stagingIccidList)
        const response = await apiInstanceOxio.get(url)
        return response.data.lines
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}
