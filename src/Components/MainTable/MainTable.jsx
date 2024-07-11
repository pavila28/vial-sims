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
            minWidth: '130px',
        },
        {
            name: 'Estado del SIM',
            selector: row => row.sim_status,
            minWidth: '140px',
            sortable: true
        },
        {
            name: 'ICCID',
            selector: row => row.sim_iccid,
            minWidth: '200px',
            sortable: true
        },
        {
            name: 'Consumo',
            selector: row => row.sim_dataUsed,
        },
        {
            name: 'Sitio',
            selector: row => row.sim_site,
            minWidth: '200px',
            sortable: true
        },
        {
            name: 'Proyecto',
            selector: row => row.sim_project,
            minWidth: '200px',
            sortable: true
        },
        {
            name: 'Pool',
            selector: row => row.sim_pool,
            minWidth: '100px',
            sortable: true
        },
        {
            name: 'Red',
            selector: row => row.sim_network,
            sortable: true
        },
        {
            name: 'Org Code',
            selector: row => row.sim_orgCode,
            minWidth: '110px',
            sortable: true
        },
    ]

    const customTableStyles = {
        rows: {
            style: {
                // minWidth: '1300px',
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
