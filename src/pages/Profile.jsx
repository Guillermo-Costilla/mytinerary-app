import { useState, useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'
//import useOrderStore from '../store/useOrderStore'
//import { useEffect } from 'react'

const Profile = () => {
    const { user, updateProfile } = useAuthStore()
    //const { orders, fetchUserOrders } = useOrderStore()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        imagen: '',
    })

    const defaultPhoto = "https://e7.pngegg.com/pngimages/549/560/png-clipart-computer-icons-login-scalable-graphics-email-accountability-blue-logo-thumbnail.png";

    // Actualizar formData cuando cambie el usuario
    useEffect(() => {
        setFormData({
            nombre: user?.nombre || '',
            email: user?.email || '',
            imagen: user?.imagen || '',
        });
    }, [user]);

    //useEffect(() => {
    //    fetchUserOrders()
    // }, [fetchUserOrders])

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        const result = await updateProfile(formData)
        if (result.success) {
            setSuccess(true)
            setIsEditing(false)
            // Actualizar el formData con los datos más recientes del usuario
            const updatedUser = useAuthStore.getState().user;
            setFormData({
                ...formData,
                nombre: updatedUser?.nombre || '',
                email: updatedUser?.email || '',
                imagen: updatedUser?.imagen || '',
            });
        } else {
            setError(result.error)
        }
    }


    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center w-full">
                    {/* Perfil con animaciones */}
                    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform scale-100 hover:scale-105">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold opacity-90 transition-opacity duration-300 hover:opacity-100">
                                Mi Profile
                            </h2>
                        </div>

                        {/* Imagen de perfil */}
                        <div className="flex justify-center mb-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-500 transition-all duration-300">
                                <img
                                    src={user?.imagen || defaultPhoto}
                                    alt="Foto de perfil"
                                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = defaultPhoto;
                                    }}
                                />
                            </div>
                        </div>

                        {/* Datos del usuario */}
                        <div className="space-y-4">
                            <div className="border-b pb-2">
                                <p className="text-gray-600 text-sm">Name</p>
                                <p className="font-semibold">{user?.nombre || "Nombre Predeterminado"}</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-gray-600 text-sm">Email</p>
                                <p className="font-semibold">{user?.email || "email@example.com"}</p>
                            </div>

                            {/* Ubicación estática */}
                            <div className="border-b pb-2">
                                <p className="text-gray-600 text-sm">Country</p>
                                <p className="font-semibold">Argentina</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-gray-600 text-sm">Province</p>
                                <p className="font-semibold">Tucumán</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-gray-600 text-sm">City</p>
                                <p className="font-semibold">San Miguel de Tucumán</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-gray-600 text-sm">Postal Code</p>
                                <p className="font-semibold">4000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile 