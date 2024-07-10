import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
import { getLinesBulk } from '../../Backend/Endpoints/getLinesBulk'

const SimsTable = () => {
    const [simLines, setSimLines] = useState([])
    
    useEffect(() => {
        const fetchSimsData = async () => {
            try {
                const data = await getLinesBulk()
                setSimLines(data)
                console.log('SIMs data: ', data)
            } catch (error) {
                console.log('Error fetching data: ', error)
            }
        }

        fetchSimsData()
        const intervalId = setInterval(() => {
            fetchSimsData()
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
        // {
        //     name: 'Plan',
        //     selector: row => row.sim_currentPlan,
        //     sortable: true
        // }
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
