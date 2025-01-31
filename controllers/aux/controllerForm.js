const processFormResponse = (req) => {
  const formData = req.body;

  // Initialize worldbuilding section with its comments
  const formResponse = {
    magicLevel: formData.magicLevel,
    techLevel: formData.techLevel,
    environment: formData.environment,
    races: Array.isArray(formData.races) ? formData.races : [formData.races].filter(Boolean),
    socialStructure: formData.socialStructure,
    conflictType: formData.conflictType,
    hook: formData.hook,
    timeConstraint: formData.timeConstraint,
    antagonistType: formData.antagonistType,
    comments: formData.plotComments || ''  // New field for plot comments
  };

  return formResponse;
};

module.exports = {processFormResponse}

// Example output structure:
/*
{
  worldbuilding: {
    magicLevel: string,
    techLevel: string,
    environment: string,
    races: string[],
    socialStructure: string,
    comments: string
  },
  plot: {
    conflictType: string,
    hook: string,
    timeConstraint: string,
    antagonistType: string,
    moralComplexity: string,
    comments: string
  },
  timestamp: string
}
*/

