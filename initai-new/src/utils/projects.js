// utils/projects.js
/**
 * Parses markdown in the standardized format:
 * ## Number. Title
 * **Problem Statement:**
 * Description text
 * 
 * **Team Members:**
 * - Member 1
 * - Member 2
 * 
 * **Links:**
 * - Live: url
 * - Paper: url
 * - Image: url
 * 
 * ---
 */

export function getProjectsFromMarkdown(markdownContent) {
  if (!markdownContent || typeof markdownContent !== 'string') {
    console.error('Invalid markdown content');
    return [];
  }

  const projects = [];
  
  // Default placeholder if no image provided
  const defaultImage = 'https://picsum.photos/600/400?random=1';
  
  // Normalize line endings
  const normalized = markdownContent.replace(/\r\n/g, '\n');
  
  // Split by horizontal rules (---) or by project headers
  const sections = normalized.split(/(?=^##\s+\d+\.)/m).filter(s => s.trim());
  
  sections.forEach((section, index) => {
    // Skip if section doesn't start with ##
    if (!section.trim().startsWith('##')) return;
    
    try {
      // Extract title
      const titleMatch = section.match(/^##\s+\d+\.\s+(.+?)$/m);
      if (!titleMatch) return;
      const title = titleMatch[1].trim();
      
      // Extract problem statement
      const psMatch = section.match(/\*\*Problem Statement:\*\*\s*([\s\S]+?)(?=\*\*Team Members:|\*\*Links:|$)/);
      const problemStatement = psMatch ? psMatch[1].trim() : '';
      
      // Extract team members
      const tmMatch = section.match(/\*\*Team Members:\*\*\s*([\s\S]+?)(?=\*\*Links:|---|\*\*|$)/);
      let teamMembers = [];
      
      if (tmMatch) {
        teamMembers = tmMatch[1]
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-'))
          .map(line => line.replace(/^-\s*/, '').trim())
          .filter(member => member.length > 0);
      }
      
      // Extract links
      const linksMatch = section.match(/\*\*Links:\*\*\s*([\s\S]+?)(?=---|$)/);
      let liveLink = '#';
      let paperLink = null;
      let imageUrl = defaultImage;
      
      if (linksMatch) {
        const linksSection = linksMatch[1];
        
        // Extract Live link
        const liveMatch = linksSection.match(/[•\-*]\s*Live:\s*(.+?)$/m);
        if (liveMatch) {
          liveLink = liveMatch[1].trim();
        }
        
        // Extract Paper link
        const paperMatch = linksSection.match(/[•\-*]\s*Paper:\s*(.+?)$/m);
        if (paperMatch) {
          const paperUrl = paperMatch[1].trim();
          if (paperUrl !== '#' && paperUrl !== '') {
            paperLink = paperUrl;
          }
        }
        
        // Extract Image link
        const imageMatch = linksSection.match(/[•\-*]\s*Image:\s*(.+?)$/m);
        if (imageMatch) {
          const imgUrl = imageMatch[1].trim();
          if (imgUrl !== '#' && imgUrl !== '') {
            imageUrl = imgUrl;
          }
        }
      }
      
      projects.push({
        title,
        thumbnail: imageUrl,
        link: liveLink,
        problemStatement,
        teamMembers,
        paperLink
      });
      
    } catch (error) {
      console.error(`Error parsing project ${index}:`, error);
    }
  });
  
  console.log(`✅ Successfully parsed ${projects.length} projects`);
  
  // Log summary
  projects.forEach((p, i) => {
    console.log(`${i + 1}. ${p.title} - ${p.teamMembers.length} members`);
  });
  
  return projects;
}

// Helper to validate markdown format
export function validateMarkdownFormat(markdownContent) {
  const issues = [];
  
  const projectHeaders = (markdownContent.match(/^##\s+\d+\./gm) || []).length;
  const problemStatements = (markdownContent.match(/\*\*Problem Statement:\*\*/g) || []).length;
  const teamMembers = (markdownContent.match(/\*\*Team Members:\*\*/g) || []).length;
  const links = (markdownContent.match(/\*\*Links:\*\*/g) || []).length;
  
  console.log('=== FORMAT VALIDATION ===');
  console.log('Project headers (##):', projectHeaders);
  console.log('Problem Statements:', problemStatements);
  console.log('Team Members sections:', teamMembers);
  console.log('Links sections:', links);
  
  if (projectHeaders !== problemStatements) {
    issues.push(`Mismatch: ${projectHeaders} headers but ${problemStatements} problem statements`);
  }
  
  if (projectHeaders !== teamMembers) {
    issues.push(`Mismatch: ${projectHeaders} headers but ${teamMembers} team member sections`);
  }
  
  if (issues.length > 0) {
    console.warn('⚠️ Format issues found:', issues);
  } else {
    console.log('✅ Format looks good!');
  }
  
  return { projectHeaders, problemStatements, teamMembers, links, issues };
}