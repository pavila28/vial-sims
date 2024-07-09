import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import apiInstanceOxio, {oxioBaseURL} from '../../Backend/InstanciasOxio/InstanceOxio'
import { stagingIccidList } from '../../Backend/iccidListOxio/iccidListOxio'

const buildGetLinesURL = (oxioBaseURL, iccidList) => {
    const linesAsQueryParams = iccidList.map(iccid => `iccids=${iccid}`).join('&')
    return `${oxioBaseURL}lines?${linesAsQueryParams}`
}

const SimsTable = () => {
    const [simLines, setSimLines] = useState([])

    const getLines = async () => {
        try {
            const baseURL = oxioBaseURL
            const url = buildGetLinesURL(baseURL, stagingIccidList)
            const response = await apiInstanceOxio.get(url)
            const data = response.data.lines
            console.log('Get line bulk: ', data)

            // Get each SIM current plan
            const getSimCurrentPlan = await Promise.all(data.map(async (sim) => {
                const urlWithIccids = `sims/${sim.iccid}/user-plans`
                const urlCompleteWithIccids = `${oxioBaseURL}${urlWithIccids}`
                console.log('URL for each SIM: ', urlCompleteWithIccids)

                try {
                    const simPlanResponse = await apiInstanceOxio.get(urlWithIccids)
                    const simPlanData = simPlanResponse.data.userPlans[0].planDisplayName
                    console.log('Sim plan: ', simPlanData)
                    return { ...sim, currentPlan: simPlanData }
                } catch (error) {
                    console.log(`Error fetching plan for SIM ${sim.iccid}:`, error)
                    return { ...sim, currentPlan: 'N/A' }
                }
            }))

            setSimLines(getSimCurrentPlan)
            console.log('Data with plans: ', getSimCurrentPlan)
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    
    useEffect(() => {
        getLines()
        const intervalId = setInterval(() => {
            getLines()
        }, 300000)

        return () => clearInterval(intervalId)
    }, [])

    const columns = [
        {
            name: 'Iccid',
            selector: row => row.sim_iccid,
        },
        {
            name: 'Line',
            selector: row => row.sim_line,
        },
        {
            name: 'SIM Status',
            selector: row => row.sim_status,
            sortable: true
        },
        {
            name: 'Pool',
            selector: row => row.sim_pool,
            sortable: true
        },
        {
            name: 'Plan',
            selector: row => row.sim_currentPlan,
            sortable: true
        }
    ]

    const customTableStyles = {
        rows: {
            style: {
                minWidth: '1000px'
            }
        }
    }

    const dataTable = simLines.map(line => ({
        sim_iccid: line.iccid,
        sim_line: line.phoneNumber.currentPhoneNumber,
        sim_status: line.status,
        sim_pool: line.services.inService ? 'Active' : 'Inactive',
        sim_currentPlan: line.currentPlan
    }))

    const [records, setRecords] = useState(dataTable)

    // Status filter
    const handleChange = (e) => {
        const filteredRecords = dataTable.filter(record => {
            return record.sim_status.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setRecords(filteredRecords)
    }

    useEffect(() => {
        setRecords(dataTable);
    }, [simLines]);

  return (
    <div className='flex flex-col items-center mt-3'>
        <input
            type='text'
            onChange={handleChange}
            // className='bg-slate-400'
            placeholder='Search by status'
        />

        <DataTable
            columns={columns}
            data={records}
            customStyles={customTableStyles}
            selectableRows
            pagination
            fixedHeader
        />
    </div>
  )
}

export default SimsTable
