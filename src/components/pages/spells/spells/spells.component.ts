import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/components/meta/base/base.component';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent extends BaseComponent {
  @Input()
  set list(spellList: string) {
    this.spells = this.dataService.getSpellsByList(spellList);
    this.elemental = spellList === 'elemental';
    this.showUnique = spellList === 'all';

    this.pageTitle = `${this.capitalize(spellList)} Spells`;

    if (Object.keys(this.descriptions).includes(spellList)) {
      this.description = this.descriptions[spellList];
    }
  }
  @Input() maxLevel: number = 10;
  @Input() cantrips: boolean = true;
  public elemental = false;
  public showUnique = false;
  public spells: any[] = [];

  public tabIndex = 0;

  public dataService: DataService;

  public descriptions = {
    arcane:
      'Arcane magic is the magic of magi, sorcerers, and wizards. For magi and wizards, magic is much akin to study, involving careful study of the Weave to speak words of power. Sorcerers use the same words, but their magic comes to them naturally, and they must study to control it rather than to attain it.',
    divine:
      'Divine magic is the magic of clerics and paladins. For clerics, they draw their divinity directly from the gods. Paladins can also draw magic from the gods, but more often their magic comes from the strength of their convictions and bonds, drawing on a subtly different form of magic.',
    elemental:
      'Elemental magic is a unique form of magic used by monks of the Way of the Wu Jen. It is similar to primal magic, drawing upon forces found in the natural world, but has a particular focus on eight elements: Aether, the element of magic; Air, the element of freedom; Earth, the element of substance; Fire, the element of power; Light, the element of vision; Shadow, the element of secrecy; Water, the element of change; and Wood, the element of life. Monks who use this magic focus on the connections between the elements and the roles they play in the world around them.',
    melodic:
      'Melodic magic is the magic of bards and troubadours. It involves casting through treating the Weave almost like sheet music, the paints on a palette, or a similar such object. Users of this magic see the boundless creative potential of the Weave, and bring it to fruition with their song, dance, or other form of art.',
    invention:
      "Invention magic is the magic of inventors. It doesn't strictly involve magic, but rather involves crafting devices that mimic the effects of other magic. For some inventors, these devices are creations of magical artifice. For others, they're creations of technology that merely appear magical to an outside observer.",
    occult:
      'Occult magic is the magic of atavists, pale masters, vessels, warlocks, and witches. It usually involves communing with some sort of otherworldly being, whether that be spirits, fiends, archfey, or anything else that can be found across the planes. Atavists use the same form of magic, but it is stored within their blood and does not require direct communion with the source like with the others.',
    primal:
      'Primal magic is the magic of druids, harbingers, rangers, shamans, and summoners. It involves manipulating the energy of the natural world, and the energy that binds all living things together. Primal magic usually involves more primitive spellcasting than other forms of magic, and is also thought to be the oldest of the traditional forms.',
    psionic:
      "Psionic magic is the magic of mystics. It isn't true magic per se, but rather psionics, a related but importantly different field. Psionics is produced by the mind, and mostly involves effects that manipulate the caster or the minds of others.",

    abjuration:
      'Abjuration emphasizes magic that blocks, banishes, or protects. Detractors of this school say that its tradition is about denial, negation rather than positive assertion. Called abjurers, members of this school are sought when baleful spirits require exorcism, when important locations must be guarded against magical spying, and when portals to other planes of existence must be closed.',
    conjuration:
      'Conjuration involves magic that summons or creates creatures, energy, or matter. Conjurers can create clouds of deadly fog or acid rain, or summon entites from above or below to do their bidding. These spellcasters rarely engage in direct combat themselves, preferring to leave any fighting to disposable minions.',
    divination:
      'Divination includes spells of discernment, remote viewing, supernatural knowledge, and foresight. The counsel of a diviner is sought by royalty and commoners alike, for all seek a clearer understanding of the past, present, and future. Diviners themselves strive to part the veils of space, time, and consciousness so that they can see clearly.',
    enchantment:
      "Enchantment involves magically entrancing and beguiling other creatures into doing the caster's bidding. Some enchanters are peacemakers who bewitch the violent to lay down their arms and charm the cruel into showing mercy. Others are tyrants who magically bind the unwilling into their service. Most enchanters fall somewhere in between.",
    evocation:
      'Evocation is magic that creates elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid, and evocation itself is best described as the manipulation of energy. Some evokers find employment in military forces, serving as artillery to blast enemy armies from afar. Others use their spectacular power to protect the weak, while some seek their own gain as bandits, adventurers, or aspiring tyrants.',
    illusion:
      'Illusion includes magic that deceives the senses or minds of others. Illusionists can cause people to see things that are not there, not see things that are there, or hear phantom noises. Powerful illusions can seem so real that they can even cause physical harm. Some illusionists are benign tricksters who use their spells to entertain. Others are more sinister masters of deception, using their illusions to frighten and fool others for their personal gain.',
    necromancy:
      'Necromancy explores the cosmic forces of death and undeath. Necromancers learn to manipulate the energy that animates all living things, and gain the ability to sap the life force from a creature as their magic destroys its body, transforming that vital energy into magical power they can manipulate. Most people see necromancers as menacing, or even villainous, due to the close association with death. Not all necromancers are evil, but the forces they manipulate are considered taboo by many societies.',
    restoration:
      "Restoration involves the magic of life and repair. Restorers are experts in healing and revival magic, and most restorers are clerics or druids who try to right the world's wrongs and heal those they encounter, physically, mentally, and spiritually.",
    sangromancy:
      "<p>Sangromancy is a dark form of magic relying on blood and vital essence. Sometimes considered a sub-school of necromancy, it is often a forbidden form of magic, and sangromancers often have to practice their craft in secrecy. Effects produced with sangromancy generally fall into two categories: directly manipulating the vital essence of other creatures, or using the caster's own blood to create magical constructs including daggers, shields, and lashes.</p><p><strong>Restriction: Blood.</strong> In order to cast or be a target of a sangromancy spell, a creature must have blood or a blood-like substance, such as ichor. Creatures that do not have blood include most constructs, most elementals, most corporeal undead, and all ethereal undead.</p>",
    transmutation:
      'Transmutation is magic that modifies energy and matter. To transmuters, the world is not a fixed thing, but eminently mutable, and they delight in being agents of change.  Some transmuters are tinkerers and pranksters, turning people into toads and transforming copper into silver for fun and occasional profit. Others pursue their magical studies with deadly seriousness, seeking the power of the gods to make and destroy worlds.',
    transposition:
      'Transposition involves magic used to manipulate the location of objects or creatures. Whether this be through outright teleportation, telekinesis, or altering the speed at which a target moves, all serves to alter where it ends up. Transposers are often extremely curious spellcasters, using their magic to explore and travel the planes in search of endless knowledge. Some transposers also find work for law enforcement, imprisoning criminals in cages of teleportative or telekinetic force.',
  };
  public description;

  constructor(dataService: DataService) {
    super();
    this.dataService = dataService;
  }

  public spellLists(spell: any) {
    if (spell?.lists?.length) {
      return spell.lists
        .sort()
        .map((l) => {
          if (l === 'Elemental') {
            return `Elemental<sup>${spell.element ?? ''}</sup>`;
          } else {
            return l;
          }
        })
        .join(', ');
    } else {
      return '';
    }
  }
}
