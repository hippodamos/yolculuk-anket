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
    <!-- <f7-list-item>
      <f7-label>Başlangıç Zamanı</f7-label>
      <f7-input type="datetime-local" :value="startDateTime" @input="log($event)" ref="sdi"></f7-input>
    </f7-list-item>
    <f7-list-item> -->
      <!-- <f7-label>Başlangıç Zamanı</f7-label>
      <f7-input type="text" :value="startDateTime"></f7-input>
    </f7-list-item>
    <f7-list-item>
      <f7-label>Bitiş Zamanı</f7-label>
      <f7-input type="datetime-local" v-model="endDateTime" name="endDateTime"></f7-input>
    </f7-list-item> -->
    <f7-list-item v-if="!hide.includes('departureNode')">
      <f7-label>Başlangıç Yeri</f7-label>
      <f7-input type="select" v-model="departureNode" name="departureNode">
        <option value="" selected="true" disabled>Seçiniz</option>
        <option v-for="node in this.tripOptions['trip-nodes']" :value="node.code" :data-display-as="node.code + ': ' + node.name">
          {{node.code }}: {{ node.name }}
        </option>
      </f7-input>
    </f7-list-item v-if="!hide.includes('departureNode')">
    <f7-list-item v-show="departureNode === 'DG'">
      <f7-label>Başlangıç Yeri (Diğer)</f7-label>
      <f7-input type="text" v-model="departureNodeOther"></f7-input>
    </f7-list-item>
    <f7-list-item v-if="!hide.includes('destinationNode')">
      <f7-label>Bitiş Yeri</f7-label>
      <f7-input type="select" v-model="destinationNode" name="destinationNode">
        <option value="" selected="true" disabled>Seçiniz</option>
        <option v-for="node in this.tripOptions['trip-nodes']" :value="node.code" :data-display-as="node.code + ': ' + node.name">
          {{node.code }}: {{ node.name }}
        </option>
      </f7-input>
    </f7-list-item v-if="!hide.includes('destinationNode')">
    <f7-list-item v-show="destinationNode === 'DG'">
      <f7-label>Bitiş Yeri (Diğer)</f7-label>
      <f7-input type="text" v-model="destinationNodeOther"></f7-input>
    </f7-list-item>
    <f7-list-item v-if="!hide.includes('mod')">
      <f7-label>Ulaşım Türeli</f7-label>
      <f7-input type="select" v-model="mod" name="mod" @change="mod !== 'Y' ? resetWalkOptions() : undefined">
        <option value="" selected="true" disabled>Seçiniz</option>
        <option v-for="mode in this.tripOptions['trip-mods']" :value="mode.code" :data-display-as="mode.code + ': ' + mode.name">
          {{mode.code }}: {{ mode.name }}
        </option>
      </f7-input>
    </f7-list-item>
    <f7-list-item v-if="!hide.includes('walkPurpose')">
      <f7-label>Yürüyüş Amacı</f7-label>
      <f7-input type="select" v-model="walkPurpose" name="walkPurpose" :disabled="mod !== 'Y'">
        <option value="" selected="true" disabled>Seçiniz</option>
        <option v-for="item in this.tripOptions['walk-purpose']" :value="item.code" :data-display-as="item.code + ': ' + item.name">
          {{item.code }}: {{ item.name }}
        </option>
      </f7-input>
    </f7-list-item>
    <f7-list-item v-if="!hide.includes('walkReasons')">
      <f7-label>Yürüyüş Nedeni</f7-label>
      <f7-input type="select" name="walkReasons" v-model="walkReasons" multiple :disabled="mod !== 'Y'">
        <!-- <option value="" selected="true" disabled>Seçiniz</option> -->
        <option v-for="item in this.tripOptions['walk-reason']" :value="item.code" :data-display-as="item.code + ': ' + item.name">
          {{item.code }}: {{ item.name }}
        </option>
      </f7-input>
    </f7-list-item>
    <f7-list-item v-if="!hide.includes('walkReasons')" v-show="walkReasons.indexOf('DG') != -1">
      <f7-label>Yürüyüş Nedeni (Diğer)</f7-label>
      <f7-input type="text" v-model="walkReasonOther"></f7-input>
    </f7-list-item>
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
  let res = value.split(':');
  if (res.length == 2) {
    return res
  } else {
    return undefined
  }
}

export default {
  data: function () {
    return {
      startDate: this.tripData ? this.tripData.startDate : "",
      startTime: this.tripData ? this.tripData.startTime : "",
      endDate: this.tripData ? this.tripData.endDate : "",
      endTime: this.tripData ? this.tripData.endTime : "",
      // startDateTime : this.tripData ? this.tripData.startDateTime : "",
      // endDateTime : this.tripData ? this.tripData.endDateTime : "",
      departureNode: this.tripData ? this.tripData.departureNode : "",
      departureNodeOther: this.tripData ? this.tripData.departureNodeOther : "",
      destinationNode: this.tripData ? this.tripData.destinationNode : "",
      destinationNodeOther: this.tripData ? this.tripData.destinationNodeOther : "",
      mod: this.tripData ?  this.tripData.mod : "",
      walkPurpose: this.tripData ? this.tripData.walkPurpose : "",
      walkReasons: this.tripData ? this.tripData.walkReasons : [],
      walkReasonOther: this.tripData ? this.tripData.walkReasonOther : [],
    };
  },

  // props: ["tripOptions", "tripData", ],
  props: {
    tripOptions: null,
    tripData: null,
    hide: {
      type: Array,
      default: function () {return []}
    }
  },

  computed: {
    trip: function () {
      let result = Trip();

      result.startDate = this.startDate;
      result.startTime = this.startTime;
      result.endDate = this.endDate;
      result.endTime = this.endTime;
      // result.startDateTime = this.startDateTime;
      // result.endDateTime = this.endDateTime;
      result.departureNode = this.departureNode;
      result.departureNodeOther = this.departureNodeOther;
      result.destinationNode = this.destinationNode;
      result.destinationNodeOther = this.destinationNodeOther;
      result.mod = this.mod;
      result.walkPurpose = this.walkPurpose;
      result.walkReasons = this.walkReasons;
      result.walkReasonOther = this.walkReasonOther;

      return result;
    },
  },

  methods: {
    resetWalkOptions: function() {
      this.walkPurpose = "";
      this.walkReasons.splice(0);
      this.walkReasonOther = "";
    },

    log: function(param) {
      console.log(param)
    }
  },

  mounted: function() {
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
