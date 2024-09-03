// crud.js

let projects = [];
let currentProjectId = null;

document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const date = document.getElementById('projectDate').value;
    const media = document.getElementById('projectMedia').files[0];

    if (currentProjectId === null) {
        // Add new project
        const newProject = {
            id: Date.now(),
            name,
            description,
            date,
            media
        };
        projects.push(newProject);
    } else {
        // Edit existing project
        const index = projects.findIndex(p => p.id === currentProjectId);
        projects[index] = {
            id: currentProjectId,
            name,
            description,
            date,
            media
        };
        currentProjectId = null;
    }
    
    document.getElementById('projectForm').reset();
    loadProjects();
});

function loadProjects() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        
        const mediaElement = document.createElement(project.media.type.startsWith('video/') ? 'video' : 'img');
        mediaElement.src = URL.createObjectURL(project.media);
        mediaElement.controls = project.media.type.startsWith('video/');
        projectItem.appendChild(mediaElement);

        const info = document.createElement('div');
        info.className = 'project-info';

        const name = document.createElement('p');
        name.textContent = `Name: ${project.name}`;
        info.appendChild(name);

        const description = document.createElement('p');
        description.textContent = `Description: ${project.description}`;
        info.appendChild(description);

        const date = document.createElement('p');
        date.textContent = `Date: ${project.date}`;
        info.appendChild(date);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            document.getElementById('projectName').value = project.name;
            document.getElementById('projectDescription').value = project.description;
            document.getElementById('projectDate').value = project.date;
            currentProjectId = project.id;
        };
        info.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            projects = projects.filter(p => p.id !== project.id);
            loadProjects();
        };
        info.appendChild(deleteButton);

        projectItem.appendChild(info);
        projectList.appendChild(projectItem);
    });
}

// Load projects on page load
window.onload = loadProjects;
