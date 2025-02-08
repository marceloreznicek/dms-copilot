

async function requestImageGeneration(
  prompt,
  novitaModel = "lyriel_v16.safetensors"
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NOVITA_API_KEY,
    },
    body: JSON.stringify({
      extra: {
        response_image_type: "png",
        enable_nsfw_detection: false,
        webhook: {
          url: process.env.NOVITA_WEBHOOK_URL,
        },
      },
      request: {
        model_name: novitaModel,
        prompt: prompt,
        width: 1200,
        height: 600,
        image_num: 1,
        steps: 20,
        guidance_scale: 10,
        sampler_name: "Euler",
        negative_prompt: "",
        seed: -1,
      },
    }),
  };

  try {
    console.log("Image request sent")
    const response = await fetch(
      "https://api.novita.ai/v3/async/txt2img",
      options
    );
    const response_parsed = await response.json();

    return response_parsed.task_id; // Changed from response to response_parsed
  } catch (err) {
    console.error(err);
    throw err; // Added error propagation
  }
}

module.exports = { requestImageGeneration };
