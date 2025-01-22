"use client"

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const ProjectCard = ({ title, description, imageUrl }: ProjectCardProps) => {
    return (
        <div className="bg-white/90 rounded-lg p-6 shadow transform transition-transform hover:-translate-y-2 border">
            <div className="w-full h-48 object-cover rounded-md mb-4 border">
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

export default ProjectCard;