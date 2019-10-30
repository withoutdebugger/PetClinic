const Menu = [
    {
        heading: 'Menú de Navegación',
    },
    {
        name: 'Inicio',
        path: '/home',
        icon : 'icon-home',
    },
    {
        name: 'Gestión',
        icon: 'icon-briefcase',
        // label: { value: 1, color: 'info' },
        submenu: [{
            name: 'Clientes',
            path: '/clientes'
        },
        {
            name: 'Pacientes',
            path: '/pacientes'
        },
        {
            name: 'Agenda',
            path: '/agenda'
        }]
    },
    {
        name: 'Compra',
        icon: 'icon-basket',
        // label: { value: 1, color: 'info' },
        submenu: [{
            name: 'Proveedores',
            path: '/proveedores'
        },
        {
            name: 'Productos/Servicios',
            path: '/productosServicios'
        }]
    },
    {
        name: 'Venta',
        icon: 'icon-plus',
        // label: { value: 1, color: 'info' },
        submenu: [
            {
                name: 'Facturación',
                path: '/facturacion'
            },
            {
                name: 'Stock',
                path: '/stock'
            }]
    },
    {
        name: 'Configuración',
        icon: 'icon-settings',
        // label: { value: 1, color: 'info' },
        submenu: [{
            name: 'Usuarios',
            path: '/usuarios'
        }]
    },
];

export default Menu;
