import DataTable from 'react-data-table-component'

const SimsTable = () => {
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

    const data = [
        {
            sim_iccid: '1234567885123456789',
            sim_status: 'Active',
            sim_line: 'Line 1',
            sim_pool: 'Pool 1'
        },
        {
            sim_iccid: '1234567890363456789',
            sim_status: 'Cold',
            sim_line: 'Line 2',
            sim_pool: 'Pool 1'
        },
        {
            sim_iccid: '1234564890123456789',
            sim_status: 'Active',
            sim_line: 'Line 3',
            sim_pool: 'Pool 2'
        },
        {
            sim_iccid: '1234567890723556789',
            sim_status: 'Warm',
            sim_line: 'Line 4',
            sim_pool: 'Pool 2'
        },
        {
            sim_iccid: '1234567890723556789',
            sim_status: 'Warm',
            sim_line: 'Line 4',
            sim_pool: 'Pool 2'
        },
        {
            sim_iccid: '1234567890723556789',
            sim_status: 'Warm',
            sim_line: 'Line 4',
            sim_pool: 'Pool 2'
        },
        {
            sim_iccid: '1234567890723556789',
            sim_status: 'Warm',
            sim_line: 'Line 4',
            sim_pool: 'Pool 2'
        },
        {
            sim_iccid: '1234567890723556789',
            sim_status: 'Warm',
            sim_line: 'Line 4',
            sim_pool: 'Pool 2'
        },
        {
            sim_iccid: '1234567890723556789',
            sim_status: 'Warm',
            sim_line: 'Line 4',
            sim_pool: 'Pool 2'
        },
        {
            sim_iccid: '1234567890723556789',
            sim_status: 'Warm',
            sim_line: 'Line 4',
            sim_pool: 'Pool 2'
        },
    ]

  return (
    <div>
        <DataTable 
            columns={columns}
            data={data}
            selectableRows
            pagination
            // paginationPerPage={5}
            onSelectedRowsChange={data => console.log(data)}
            fixedHeader
        />
    </div>
  )
}

export default SimsTable
