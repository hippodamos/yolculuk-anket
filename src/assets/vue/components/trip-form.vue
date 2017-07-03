<template>
  <f7-list form id="tripForm">
    <f7-list-item v-if="!hide.includes('startDate')">
      <f7-label>Başlangıç Tarihi</f7-label>
      <f7-input type="text" v-model="startDate" id="startDate" @change="startDate=$event.srcElement.value" placeholder="Başlangıç Tarihi"></f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('startTime')">
      <f7-label>Başlangıç Saati</f7-label>
      <f7-input type="text" v-model="startTime" id="startTime" @change="startTime=$event.srcElement.value" placeholder="Başlangıç Saati"></f7-input>
    </f7-list-item>

    <f7-list-item  v-if="!hide.includes('endDate')">
      <f7-label>Bitiş Tarihi</f7-label>
      <f7-input type="text" v-model="endDate" id="endDate" @change="endDate=$event.srcElement.value" placeholder="Bitiş Tarihi"></f7-input>
    </f7-list-item>

    <f7-list-item  v-if="!hide.includes('endTime')">
      <f7-label>Bitiş Saati</f7-label>
      <f7-input type="text" v-model="endTime" id="endTime" @change="endTime=$event.srcElement.value" placeholder="Bitiş Saati"></f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('departureNode')">
      <f7-label>Başlangıç Yeri</f7-label>
      <f7-input type="select" v-model="departureNode" name="departureNode">
        <option value="" selected="true" disabled>Seçiniz</option>
        <option v-for="node in this.tripOptions.tripNodes" :value="node.code" :data-display-as="node.code + ': ' + node.name">
          {{ node.code }}: {{ node.name }}
        </option>
      </f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('departureNode')" v-show="departureNode === 'DG'">
      <f7-label>Başlangıç Yeri (Diğer)</f7-label>
      <f7-input type="text" v-model="departureNodeOther"></f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('destinationNode')">
      <f7-label>Bitiş Yeri</f7-label>
      <f7-input type="select" v-model="destinationNode" name="destinationNode">
        <option value="" selected="true" disabled>Seçiniz</option>
        <option v-for="node in this.tripOptions.tripNodes" :value="node.code" :data-display-as="node.code + ': ' + node.name">
          {{node.code }}: {{ node.name }}
        </option>
      </f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('destinationNode')" v-show="destinationNode === 'DG'">
      <f7-label>Bitiş Yeri (Diğer)</f7-label>
      <f7-input type="text" v-model="destinationNodeOther"></f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('mod')">
      <f7-label>Ulaşım Türeli</f7-label>
      <f7-input type="select" v-model="mod" name="mod" @change="mod === 'Y' ? setWalkOptions() :unsetWalkOptions()">
        <option value="" selected="true" disabled>Seçiniz</option>
        <option v-for="mode in this.tripOptions.tripMods" :value="mode.code" :data-display-as="mode.code + ': ' + mode.name">
          {{mode.code }}: {{ mode.name }}
        </option>
      </f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('walkPurpose')">
      <f7-label>Yürüyüş Amacı</f7-label>
      <f7-input type="select" v-model="walkPurpose" name="walkPurpose" :disabled="mod !== 'Y'">
        <option value="" selected="true" disabled>Seçiniz</option>
        <option v-for="item in this.tripOptions.walkPurpose" :value="item.code" :data-display-as="item.code + ': ' + item.name">
          {{item.code }}: {{ item.name }}
        </option>
      </f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('walkReasons')">
      <f7-label>Yürüyüş Nedeni</f7-label>
      <f7-input type="select" name="walkReasons" v-model.lazy="walkReasons" multiple :disabled="mod !== 'Y'">
        <option v-for="item in this.tripOptions.walkReason" :value="item.code" :data-display-as="item.code + ': ' + item.name">
          {{ item.code }}: {{ item.name }}
        </option>
      </f7-input>
    </f7-list-item>

    <f7-list-item v-if="!hide.includes('walkReasons')" v-show="walkReasons.indexOf('DG') != -1">
      <f7-label>Yürüyüş Nedeni (Diğer)</f7-label>
      <f7-input type="text" v-model="walkReasonOther"></f7-input>
    </f7-list-item>

    <!-- <f7-list-item divider></f7-list-item> -->
    <f7-list-group>
      <f7-list-item group-title title="Değerlendirme"></f7-list-item>

      <f7-list-item
                    v-if="!hide.includes('questions')"
                    v-show="mod === 'Y'"
                    v-for="quest in tripOptions.questions"
                    smart-select
                    smart-select-open-in="picker"
                    smart-select-back-text="Geri"
                    smart-select-back-on-select>
        <div slot="root-start" style="text-align: center; padding: 15px 15px 0px 15px; font-size: medium;">
          {{quest.question}}
        </div>
        <select name="quest.code" v-model="$data[quest.code]">
          <option :value="null" selected disabled>Seçiniz</option>
          <option
                  v-for="rating in tripOptions.ratings"
                  :value="rating.code">
            {{rating.code + ":" + rating.description}}
          </option>
        </select>
      </f7-list-item>
    </f7-list-group>

  </f7-list>
</template>
<script>
import Trip from 'assets/js/trip.js'

let monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

let monthNamesShort = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
                    'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']

let dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma',
                'Cumartesi']

let dayNamesShort = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function range(limit) {
  let arr = []
  for (let i = 0; i < limit; i++) {arr.push(pad(i,2))}
  return arr
}

let hours = range(24)
let minutes = range(60)

function timePickerFormat(p, values, displayValues) {
  return displayValues[0] + ':' + displayValues[1]
}

function timePickerParse(value) {
  if (value) {
    let res = value.split(':');
    if (res.length == 2) {
      return res
    } else {
      return undefined
    }
  }
}

export default {
  data: function () {
    return {
      startDate: this.initialData.startDate || null,
      startTime: this.initialData.startTime || null,
      endDate: this.initialData.endDate || null,
      endTime: this.initialData.endTime || null,
      departureNode: this.initialData.departureNode || null,
      departureNodeOther: this.initialData.departureNodeOther || null,
      destinationNode: this.initialData.destinationNode || null,
      destinationNodeOther: this.initialData.destinationNodeOther || null,
      mod: this.initialData.mod || null,
      walkPurpose: this.initialData.walkPurpose || null,
      walkReasons: this.initialData.walkReasons ? this.initialData.walkReasons.split(" ") : [],
      walkReasonOther: this.initialData.walkReasonOther || null,
      Q1: this.initialData.Q2 || null,
      Q2: this.initialData.Q2 || null,
      Q3: this.initialData.Q3 || null,
      Q4: this.initialData.Q4 || null,
      Q5: this.initialData.Q5 || null,
      Q6: this.initialData.Q6 || null,
      Q7: this.initialData.Q7 || null,
      Q8: this.initialData.Q8 || null,
      Q9: this.initialData.Q9 || null,
      Q10: this.initialData.Q10 || null,
      Q11: this.initialData.Q11 || null,
    };
  },

  props: {
    tripOptions: null,
    initialData: {
      type: Object,
      default: () => {return {}}
    },
    hide: {
      type: Array,
      default: function () {return []}
    }
  },

  computed: {
    formData () {
      let result = {};
      for (let key in this.$data) {
        if (this[key]) {
          if (Array.isArray(this[key]))
          {
            if (this[key].length > 0) result[key] = this[key].join(" ");
          }
          else {
            result[key] = this[key];
          }
        }
      }
      return result;
    },

    walkReasonsArray: {
      get: function () {
        if (this.walkReasons) {
          return this.walkReasons.split();
        }
        else {
          return [];
        }
      },

      set: function (newValue) {
        this.walkReasons = newValue.join(" ");
      }
    }
  },

  methods: {
    questionChange (quest, event) {
      this[quest.code] = event
    },

    setWalkOptions () {
    },

    unsetWalkOptions () {
      this.walkPurpose = null;
      this.walkReasons = [];
      this.walkReasonOther = null;
      for (let key in this.tripOptions.questions) {
        this[key] = null;
      }
    },
  },

  watch: {
    formData () {
      this.$emit('formChange', this.formData);
    }
  },

  mounted () {
    this.$f7.calendar({input: "#startDate", closeOnSelect: true, monthNames,
                        monthNamesShort, dayNames, dayNamesShort})
    this.$f7.calendar({input: "#endDate", closeOnSelect: true, monthNames,
                        monthNamesShort, dayNames, dayNamesShort})
    this.$f7.picker({input: "#startTime",
                      toolbarCloseText: 'Tamam',
                      formatValue: timePickerFormat,
                      value: timePickerParse(this.startTime),
                      rotateEffect: true,
                        cols: [{values: hours},
                                {divider: true, content: ':'},
                                {values: minutes}]})
    this.$f7.picker({input: "#endTime",
                      toolbarCloseText: 'Tamam',
                      formatValue: timePickerFormat,
                      value: timePickerParse(this.endTime),
                      rotateEffect: true,
                        cols: [{values: hours},
                                {divider: true, content: ':'},
                                {values: minutes}]})

  }

}
</script>
<style>
.item-title.label {
  white-space: normal;
}
</style>
