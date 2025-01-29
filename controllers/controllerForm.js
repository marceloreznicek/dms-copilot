const processFormResponse = (req) => {
  const queryParams = req.query;
  const formResponse = {
    campaign_length: queryParams["campaign-length"],
    setting_type: queryParams["setting-type"],
    races: Array.isArray(queryParams.races)
      ? queryParams.races
      : [queryParams.races], // Handle multiple race selections
    magic_level: queryParams["magic-level"],
    tech_level: queryParams["tech-level"],
    main_conflict: queryParams["main-conflict"],
    plot_structure: queryParams["plot-structure"],
    villain_type: queryParams["villain-type"],
    tone: queryParams.tone,
    key_locations: queryParams["key-locations"],
    special_requests: queryParams["special-requests"],
  }

  return formResponse;
};

module.exports = {
  processFormResponse,
};