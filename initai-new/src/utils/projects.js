// utils/projects.js
export function getProjectsFromMarkdown(markdownContent) {
  const projects = [];
  // Array of tech-related placeholder images
  const placeholderImages = [
    'https://picsum.photos/600/400?random=1&grayscale&blur=1', // First row
    'https://picsum.photos/600/400?random=2&grayscale&blur=2',
    'https://picsum.photos/600/400?random=3&grayscale&blur=3',
    'https://picsum.photos/600/400?random=4&grayscale&blur=4',
    'https://picsum.photos/600/400?random=5&grayscale&blur=5',
    'https://picsum.photos/600/400?random=6&sepia', // Second row
    'https://picsum.photos/600/400?random=7&sepia',
    'https://picsum.photos/600/400?random=8&sepia',
    'https://picsum.photos/600/400?random=9&sepia',
    'https://picsum.photos/600/400?random=10&sepia',
    'https://picsum.photos/600/400?random=11', // Third row
    'https://picsum.photos/600/400?random=12',
    'https://picsum.photos/600/400?random=13',
    'https://picsum.photos/600/400?random=14',
    'https://picsum.photos/600/400?random=15'
  ];
  const sections = markdownContent.split('## ').slice(1);
  
  sections.forEach((section, index) => {
    const titleMatch = section.match(/^\d+\. (.+)/);
    if (!titleMatch) return;
    
    const title = titleMatch[1];
    const problemStatementMatch = section.match(/\*\*Problem Statement:\*\*([\s\S]+?)\*\*Team Members:\*\*/);
    const teamMembersMatch = section.match(/\*\*Team Members:\*\*([\s\S]+?)(?:##|$)/);
    
    projects.push({
      title,
      thumbnail: placeholderImages[index % placeholderImages.length], // Cycle through images
      link: '#',
      problemStatement: problemStatementMatch ? problemStatementMatch[1].trim() : '',
      teamMembers: teamMembersMatch ? 
        teamMembersMatch[1].trim().split('\n').map(m => m.replace(/^- /, '').trim()) : []
    });
  });
  
  return projects;
}