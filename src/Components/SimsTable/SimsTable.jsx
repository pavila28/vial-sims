import DataTable from 'react-data-table-component'
import apiInstanceOxio from '../../Backend/InstanciasOxio/InstanceOxio'
import { useEffect, useState } from 'react'

const SimsTable = () => {
    const [simLines, setSimLines] = useState([])

    useEffect(() => {
        async function getLines() {
            try {
                const response = await apiInstanceOxio.get('lines?iccids=8952040000780301327F&iccids=8952040000780301335F')
                const data = response.data.lines
                setSimLines(data)
                console.log('Data: ', data)
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getLines()
    }, [])

    const columns = [
        {
            name: 'Iccid',
            selector: row => row.sim_iccid,
        },
        {
            name: 'SIM Status',
            selector: row => row.sim_status,
            sortable: true
        },
        {
            name: 'Line',
            selector: row => row.sim_line,
        },
        {
            name: 'Pool',
            selector: row => row.sim_pool,
            sortable: true
        },
    ]

    const dataTable = simLines.map(line => ({
        sim_iccid: line.iccid,
        sim_status: line.status,
        sim_line: line.phoneNumber.currentPhoneNumber,
        sim_pool: line.services.inService ? 'Active' : 'Inactive'
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
            selectableRows
            pagination
            fixedHeader
        />
    </div>
  )
}

export default SimsTable
