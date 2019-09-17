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
