# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
# * Rearrange models' order
# * Make sure each model has one field with primary_key=True
# * Remove `managed = False` lines if you wish to allow Django to create and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.
from __future__ import unicode_literals

from django.db import models


class Segpub(models.Model):
    protocolo = models.IntegerField(db_column='Protocolo', primary_key=True)
    batalhao = models.TextField(db_column='Batalhao', blank=True)
    categoria = models.TextField(db_column='Categoria', blank=True)
    solicitante = models.TextField(db_column='Solicitante', blank=True)
    contatos = models.IntegerField(db_column='Contatos', blank=True, null=True)
    codigonaturezainicial = models.IntegerField(db_column='CodigoNaturezaInicial', blank=True, null=True)
    descricaonaturezainicial = models.TextField(db_column='DescricaoNaturezaInicial', blank=True)
    codigonaturezafinal = models.IntegerField(db_column='CodigoNaturezaFinal', blank=True, null=True)
    descricaonaturezafinal = models.TextField(db_column='DescricaoNaturezaFinal', blank=True)
    uf = models.TextField(db_column='Uf', blank=True)
    municipio = models.TextField(db_column='Municipio', blank=True)
    bairro = models.TextField(db_column='Bairro', blank=True)
    logradouro = models.TextField(db_column='Logradouro', blank=True)
    complemento = models.TextField(db_column='Complemento', blank=True)
    referencia = models.TextField(db_column='Referencia', blank=True)
    longitude = models.FloatField(db_column='Longitude', blank=True, null=True)
    latitude = models.FloatField(db_column='Latitude', blank=True, null=True)
    observacoes = models.TextField(db_column='Observacoes', blank=True)
    inicioatendimento = models.TextField(db_column='InicioAtendimento', blank=True)
    terminoatendimento = models.TextField(db_column='TerminoAtendimento', blank=True)
    atendente = models.IntegerField(db_column='Atendente', blank=True, null=True)
    despacho = models.TextField(db_column='Despacho', blank=True)
    veiculos = models.TextField(db_column='Veiculos', blank=True)
    guarnicoes = models.TextField(db_column='Guarnicoes', blank=True)
    tiposdepoliciamento = models.TextField(db_column='TiposDePoliciamento', blank=True)
    chegadaaolocal = models.TextField(db_column='ChegadaAoLocal', blank=True)
    terminodeempenho = models.TextField(db_column='TerminoDeEmpenho', blank=True)
    conclusao = models.TextField(db_column='Conclusao', blank=True)

    def __unicode__(self):  # Python 3: def __str__(self):
        return unicode(self.protocolo)

    class Meta:
        managed = False
        db_table = 'segpub'