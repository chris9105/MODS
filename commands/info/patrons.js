/**
 * @file patrons command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let patrons = Bastion.user.id !== '267035345537728512' ? await Bastion.methods.getBastionPatrons() : await Bastion.methods.getPatrons();
  patrons = patrons.filter(patron => !patron.declined_since).map(patron => patron.full_name);

  let noOfPages = patrons.length / 50;
  let i = (args.page > 0 && args.page < noOfPages + 1) ? args.page : 1;
  i = i - 1;

  let description = Bastion.user.id !== '267035345537728512'
    ? 'These are the awesome people who continuously support the development of the Bastion bot project, by being my patron, on [Patreon](https://patreon.com/bastionbot).\nIf you want to support the development of Bastion too, [be my Patron](https://patreon.com/bePatron?c=754397)'
    : 'These are the awesome people who continuously support us, by being our patron, on Patreon.';

  await message.channel.send({
    embed: {
      color: 16345172,
      description: description,
      fields: [
        {
          name: 'Patrons',
          value: patrons.slice(i * 50, (i * 50) + 50).join(', ')
        }
      ],
      footer: {
        text: `Page: ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`
      }
    }
  });
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'page', type: Number, alias: 'p', defaultOption: true, defaultValue: 1 }
  ]
};

exports.help = {
  name: 'patrons',
  description: 'Shows the list of people who continuously supports the development of the Bastion Bot project, by being my patron, on [Patreon](%patreon%). But if you\'re hosting Bastion yourself, and you\'re a Patreon creator, it will show the list of your Patrons.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'patrons',
  example: []
};
