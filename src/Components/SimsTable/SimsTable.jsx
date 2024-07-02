import DataTable from 'react-data-table-component'
import apiInstanceOxio from '../../Backend/InstanciasOxio/InstanceOxio'
import { useEffect, useState } from 'react'

const SimsTable = () => {
    const [simLine, setSimLine] = useState(null)
    const [apiError, setApiError] = useState(null)

    useEffect(() => {
        async function getLine() {
            try {
                const response = await apiInstanceOxio.get('lines/28f133f0-3f41-4bdd-b143-8eb88bb6f27a')
                const data = response.data
                setSimLine(data)
                console.log('Data: ', data)
            } catch (error) {
                setError(error)
                console.log('Error: ', error)
            }
        }

        getLine()
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

    const dataTable = simLine ? [
        {
            sim_iccid: simLine.iccid,
            sim_status: simLine.status,
            sim_line: simLine.phoneNumber.currentPhoneNumber,
            sim_pool: simLine.services.inService ? 'Active' : 'Inactive'
        }
    ] : []

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
    }, [simLine]);

  return (
    <div className='flex flex-col items-center mt-3'>
        <input
            type='text'
            onChange={handleChange}
            className='bg-slate-400'
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
