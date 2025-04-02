"use client"

import { motion } from "framer-motion"
import { User, Mail, MapPin, Calendar, Flag, Building } from "lucide-react"
import useAuthStore from "../store/authStore"

const UserProfile = () => {
    const { user } = useAuthStore()

    // Información por defecto
    const defaultInfo = {
        country: "Argentina",
        province: "Tucumán",
        city: "San Miguel de Tucumán",
        memberSince: new Date().toLocaleDateString(),
    }

    return (
        <div className="max-w-4xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold mb-8"
            >
                My Profile
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="md:col-span-1"
                >
                    <div className="card p-6 text-center">
                        <div className="w-32 h-32 mx-auto mb-4">
                            <img
                                src={
                                    user?.photo ||
                                    `https://ui-avatars.com/api/?name=${user?.name || user?.email}&background=3b82f6&color=fff`
                                }
                                alt={user?.name || user?.email}
                                className="w-full h-full object-cover rounded-full border-4 border-primary/20"
                            />
                        </div>

                        <h2 className="text-xl font-bold">{user?.name || user?.email}</h2>
                        <p className="text-muted-foreground mt-1">{user?.email}</p>

                        <div className="mt-6 text-left">
                            <h3 className="font-medium mb-2">Información de la cuenta</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center">
                                    <Calendar size={16} className="text-primary mr-2" />
                                    <span className="text-muted-foreground w-24">Miembro desde:</span>
                                    <span>{defaultInfo.memberSince}</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded-full text-xs ml-6">
                                        Activo
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="md:col-span-2"
                >
                    <div className="card">
                        <div className="bg-primary text-primary-foreground p-4">
                            <h2 className="text-xl font-bold">Personal Information</h2>
                        </div>

                        <div className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <User size={20} className="text-primary mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-medium">Full name</h3>
                                        <p className="text-muted-foreground">{user?.name || "No especificado"}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Mail size={20} className="text-primary mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-medium">Email</h3>
                                        <p className="text-muted-foreground">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Flag size={20} className="text-primary mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-medium">Country</h3>
                                        <p className="text-muted-foreground">{defaultInfo.country}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <MapPin size={20} className="text-primary mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-medium">Stade</h3>
                                        <p className="text-muted-foreground">{defaultInfo.province}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Building size={20} className="text-primary mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-medium">Locality</h3>
                                        <p className="text-muted-foreground">{defaultInfo.city}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 card">
                        <div className="bg-primary text-primary-foreground p-4">
                            <h2 className="text-xl font-bold">Your Activity</h2>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="bg-muted p-4 rounded-lg text-center">
                                    <h3 className="text-3xl font-bold text-primary">0</h3>
                                    <p className="text-muted-foreground">Ciudades Creadas</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg text-center">
                                    <h3 className="text-3xl font-bold text-primary">0</h3>
                                    <p className="text-muted-foreground">Comentarios</p>
                                </div>
                                <div className="bg-muted p-4 rounded-lg text-center">
                                    <h3 className="text-3xl font-bold text-primary">0</h3>
                                    <p className="text-muted-foreground">Me gusta</p>
                                </div>
                            </div>

                            <p className="text-center text-muted-foreground">
                                Start creating cities and interacting with the community to see your activity here!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default UserProfile

