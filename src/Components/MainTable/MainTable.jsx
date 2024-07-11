import DataTable, { createTheme } from 'react-data-table-component'
import { useEffect, useState } from 'react'
import { getLinesBulk } from '../../Backend/Endpoints/getLinesBulk'

const MainTable = () => {
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
            name: 'Line',
            selector: row => row.sim_line,
        },
        {
            name: 'SIM Status',
            selector: row => row.sim_status,
            sortable: true
        },
        {
            name: 'Iccid',
            selector: row => row.sim_iccid,
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
                minWidth: '1000px',
                border: '1px solid black',
            }
        },
        headCells: {
            style: {
                border: '1px solid black',
                backgroundColor: '#f5f5f5', // Fondo ligero para celdas de encabezado
                color: 'black', // Color del texto en celdas de encabezado
                fontWeight: 'bold', // Texto en negrita
            }
        }
    }

    const dataTable = simLines.map(line => ({
        sim_line: line.phoneNumber.currentPhoneNumber,
        sim_status: line.status,
        sim_iccid: line.iccid,
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
            placeholder='Search by status'
            style={{ border: '1px solid black', backgroundColor: '#f5f5f5', padding: '5px', borderRadius: '4px', marginBottom: '5px', textAlign: 'center', height: '40px', lineHeight: '40px' }}
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

export default MainTable
