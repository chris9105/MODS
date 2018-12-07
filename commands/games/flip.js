/**
 * @file flip command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let outcomes = [
    'Heads',
    'Tails'
  ];
  let outcome = outcomes.getRandom();

  if (args[0] && parseInt(args[0])) {
    args[0] = parseInt(args[0]);
    if (args[0] > 10) {
      args[0] = 50;
    }
    for (let i = 1; i < args[0]; i++) {
      outcome += `, ${outcomes.getRandom()}`;
    }
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Flipped',
      description: outcome
    }
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'flip',
  description: 'Flips the specified amount of coins and shows you the outcomes.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'flip [no_of_coins]',
  example: [ 'flip', 'flip 5' ]
};
