const Audio				= 	require('./../models').Audios;
const Failure			= 	require('./../models').Failures;

let audios = async function (req, res, next) {
	let audio_id, err, audio;
	audio_id = req.params.audio_id;

	[err, audio] = await to(Audio.findOne({where:{id: audio_id}}));
	if (err) return ReS(res, "No se ha encontrado la grabación de audio");
	if (!audio) return ReE(res, "Audio no encontrado con id: "+audio_id);

	let user = req.user;
	if (audio.UserId != user.id) return ReE(res, "El usuario no tiene acceso a este audio");

	req.audio = audio;
	next();
} 
module.exports.audios = audios;

let failures = async function (req, res, next) {
	let failure_id, err, failure;
	failure_id = req.params.failure_id;

	[err, failure] = await to(Failure.findOne({where:{id: failure_id}}));
	if (err) return ReS(res, "No se ha encontrado la grabación de falla de audio");
	if (!failure) return ReE(res, "Falla no encontrado con id: "+failure_id);

	req.failure = failure;
	next();
} 
module.exports.failures = failures;

let results = async function (req, res, next) {
	let failure_id, audio_id, failure, audio, err;
	failure_id = req.params.failure_id;
	audio_id   = req.params.audio_id;

	[err, failure] = await to(Failure.findOne({where:{id: failure_id}}));
	if (err) return ReS(res, "No se ha encontrado la grabación de falla de audio");
	if (!failure) return ReE(res, "Falla no encontrado con id: "+failure_id);

	[err, audio] = await to(Audio.findOne({where:{id: audio_id}}));
	if (err) return ReS(res, "No se ha encontrado la grabación de audio");
	if (!audio) return ReE(res, "Audio no encontrado con id: "+audio_id);

	req.failure = failure.content;
	req.audio   = audio.content;
	next();
}
module.exports.results = results;