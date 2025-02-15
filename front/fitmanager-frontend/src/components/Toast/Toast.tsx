import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: 'white',
    color: 'black',
    iconColor: 'black',
    customClass: {
        popup: 'animate-fade-in animate-slide-in mt-14 h-18 flex items-center',
        title: 'text-sm font-thin text-black', 
        icon: 'text-sm font-thin text-black',
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});
